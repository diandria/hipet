import { HttpRequest } from '../../../../config/controllers/contracts'
import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindUserByIdController } from '../../../hipet/controllers'
import { FindUserByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockUser } from '../../mocks/schemata/entities'
import { makeFindUserByIdUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: FindUserByIdController
  findUserByIdUseCaseStub: FindUserByIdUseCaseInterface
}

const makeSut = (): SutTypes => {
  const findUserByIdUseCaseStub = makeFindUserByIdUseCase()
  const sut = new FindUserByIdController(findUserByIdUseCaseStub)
  return {
    sut,
    findUserByIdUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Find User By Id Controller', () => {
  test('Should return 500 if FindUserByIdUseCase throws', async () => {
    const { sut, findUserByIdUseCaseStub } = makeSut()
    jest.spyOn(findUserByIdUseCaseStub, 'find').mockImplementationOnce(() => {
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
      user: mockUser('person')
    }))
  })
})
