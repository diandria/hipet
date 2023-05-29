import { HttpRequest } from '../../../../config/controllers/contracts'
import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindPostByIdController } from '../../../hipet/controllers'
import { FindPostByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockPost } from '../../mocks/schemata/entities'
import { makeFindPostByIdUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: FindPostByIdController
  findPostByIdUseCaseStub: FindPostByIdUseCaseInterface
}

const makeSut = (): SutTypes => {
  const findPostByIdUseCaseStub = makeFindPostByIdUseCase()
  const sut = new FindPostByIdController(findPostByIdUseCaseStub)
  return {
    sut,
    findPostByIdUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Find Post By Id Controller', () => {
  test('Should return 500 if FindPostByIdUseCase throws', async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut()
    jest.spyOn(findPostByIdUseCaseStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      post: mockPost()
    }))
  })
})
