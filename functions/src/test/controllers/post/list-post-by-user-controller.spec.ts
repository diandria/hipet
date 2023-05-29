import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ListPostByUserController } from '../../../hipet/controllers'
import { ListPostByUserResultStatusOptions, ListPostByUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockPost } from '../../mocks/schemata/entities'
import { makeListPostByUserUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: ListPostByUserController
  listPostByUserUseCaseStub: ListPostByUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const listPostByUserUseCaseStub = makeListPostByUserUseCase()
  const sut = new ListPostByUserController(listPostByUserUseCaseStub)
  return {
    sut,
    listPostByUserUseCaseStub
  }
}

const mockQuery = {}
const mockParams = {
  customer_id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (query: any, params: any): HttpRequest => ({ query, params })

describe('ListAll Post Controller', () => {
  test('Should return 500 if ListPostByUserUseCase throws', async () => {
    const { sut, listPostByUserUseCaseStub } = makeSut()
    jest.spyOn(listPostByUserUseCaseStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockQuery, mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if user doesnt exist', async () => {
    const { sut, listPostByUserUseCaseStub } = makeSut()
    jest.spyOn(listPostByUserUseCaseStub, 'list').mockImplementationOnce(async () =>
      Promise.resolve({
        status: ListPostByUserResultStatusOptions.user_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockQuery, mockParams))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('User', mockParams.customer_id)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockQuery, mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      posts: [mockPost()]
    }))
  })
})
