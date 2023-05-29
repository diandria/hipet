import { HttpRequest } from '../../../../config/controllers/contracts'
import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ListPostByAnimalTypeController } from '../../../hipet/controllers'
import { ListPostByAnimalTypeUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockPost } from '../../mocks/schemata/entities'
import { makeListPostByAnimalTypeUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: ListPostByAnimalTypeController
  createPostUseCaseStub: ListPostByAnimalTypeUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createPostUseCaseStub = makeListPostByAnimalTypeUseCase()
  const sut = new ListPostByAnimalTypeController(createPostUseCaseStub)
  return {
    sut,
    createPostUseCaseStub
  }
}

const mockQuery = {
  type: 'CACHORRO'
}

const makeRequest = (query: any): HttpRequest => ({ query })

describe('ListAll Post Controller', () => {
  test('Should return 500 if ListPostByAnimalTypeUseCase throws', async () => {
    const { sut, createPostUseCaseStub } = makeSut()
    jest.spyOn(createPostUseCaseStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockQuery))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockQuery))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      posts: [mockPost()]
    }))
  })
})
