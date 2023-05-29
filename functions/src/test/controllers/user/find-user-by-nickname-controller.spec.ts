import { HttpRequest } from '../../../../config/controllers/contracts'
import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindUserByNicknameController } from '../../../hipet/controllers'
import { FindUserByNicknameUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockUser } from '../../mocks/schemata/entities'
import { makeFindUserByNicknameUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: FindUserByNicknameController
  findUserByNicknameUseCaseStub: FindUserByNicknameUseCaseInterface
}

const makeSut = (): SutTypes => {
  const findUserByNicknameUseCaseStub = makeFindUserByNicknameUseCase()
  const sut = new FindUserByNicknameController(findUserByNicknameUseCaseStub)
  return {
    sut,
    findUserByNicknameUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Find User By Nickname Controller', () => {
  test('Should return 500 if FindUserByNicknameUseCase throws', async () => {
    const { sut, findUserByNicknameUseCaseStub } = makeSut()
    jest.spyOn(findUserByNicknameUseCaseStub, 'find').mockImplementationOnce(() => {
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
