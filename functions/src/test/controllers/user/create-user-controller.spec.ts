import { HttpRequest } from '../../../../config/controllers/contracts'
import { MissingParamError, NotAcceptParamError, ServerError } from '../../../../config/controllers/errors'
import { serverError, badRequest, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreateUserController } from '../../../hipet/controllers'
import { CreateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockUser } from '../../mocks/schemata/entities'
import { makeCreateUserUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: CreateUserController
  createUserUseCaseStub: CreateUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createUserUseCaseStub = makeCreateUserUseCase()
  const sut = new CreateUserController(createUserUseCaseStub)
  return {
    sut,
    createUserUseCaseStub
  }
}

const mockBody = {
  type: 'PERSON',
  name: 'any_name',
  email: 'any_mail@mail.com',
  nickname: 'any_nickname',
  phone_number: '(00) 00000-0000',
  password: 'any_password',
  document: '123.456.789-00',
  picture: 'any_picture_in_base64'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create User Controller', () => {
  test('Should return 500 if CreateUserUseCase throws', async () => {
    const { sut, createUserUseCaseStub } = makeSut()
    jest.spyOn(createUserUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 400 if is missing a parametenot accept param - donation link', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({
      type: 'PERSON',
      name: 'any_name',
      email: 'any_mail@mail.com',
      nickname: 'any_nickname',
      phone_number: '(00) 00000-0000',
      password: 'any_password',
      document: '123.456.789-00',
      donation_link: 'any_donation_url.com.br',
      picture: 'any_picture_in_base64'
    }))
    expect(httpResponse).toEqual(badRequest(new NotAcceptParamError('donation_link')))
  })

  test('Should return 400 if is missing a parametenot accept param - document', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({
      type: 'ONG',
      name: 'any_name',
      email: 'any_mail@mail.com',
      nickname: 'any_nickname',
      phone_number: '(00) 00000-0000',
      password: 'any_password',
      document: '123.456.789-00',
      picture: 'any_picture_in_base64'
    }))
    expect(httpResponse).toEqual(badRequest(new NotAcceptParamError('document')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: mockUser('person')
    }))
  })
})
