import { HttpRequest } from '../../../../config/controllers/contracts'
import { AccessDeniedError, ContentNotFoundError, MissingParamError, ServerError } from '../../../../config/controllers/errors'
import { serverError, badRequest, success, notFound, unauthorized } from '../../../../config/controllers/helpers/http-helpers'
import { LoginUserController } from '../../../hipet/controllers'
import { LoginUserResultStatusOptions, LoginUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockSimpleUser } from '../../mocks/schemata/entities'
import { makeLoginUserUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: LoginUserController
  updateUserUseCaseStub: LoginUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const updateUserUseCaseStub = makeLoginUserUseCase()
  const sut = new LoginUserController(updateUserUseCaseStub)
  return {
    sut,
    updateUserUseCaseStub
  }
}

const mockBody = {
  email: 'any_mail@mail.com',
  password: 'any_password'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Login User Controller', () => {
  test('Should return 500 if LoginUserUseCase throws', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 404 if user doesnt exist', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'authenticate').mockImplementationOnce(async () =>
      Promise.resolve({
        status: LoginUserResultStatusOptions.user_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('User', mockBody.email)))
  })

  test('Should return 400 if any field value already exists', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'authenticate').mockImplementationOnce(async () =>
      Promise.resolve({
        status: LoginUserResultStatusOptions.wrong_password
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(unauthorized(new AccessDeniedError(LoginUserResultStatusOptions.wrong_password)))
  })

  test('Should return 200 if is a success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: mockSimpleUser()
    }))
  })
})
