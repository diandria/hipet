import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError, NotAcceptParamError, ServerError, WrongParamError } from '../../../../config/controllers/errors'
import { serverError, badRequest, success, notFound } from '../../../../config/controllers/helpers/http-helpers'
import { UpdateUserController } from '../../../hipet/controllers'
import { UpdateUserResultStatusOptions, UpdateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockUser } from '../../mocks/schemata/entities'
import { makeUpdateUserUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: UpdateUserController
  updateUserUseCaseStub: UpdateUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const updateUserUseCaseStub = makeUpdateUserUseCase()
  const sut = new UpdateUserController(updateUserUseCaseStub)
  return {
    sut,
    updateUserUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const mockBody = {
  type: 'PERSON',
  name: 'any_name',
  email: 'any_mail@mail.com',
  nickname: 'any_nickname',
  phone_number: '(00) 00000-0000',
  password: 'any_password',
  picture: 'any_picture_in_base64'
}

const makeRequest = (body: any, params: any): HttpRequest => ({ body, params })

describe('Update User Controller', () => {
  test('Should return 500 if UpdateUserUseCase throws', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody, mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}, {}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 400 if is missing a paramet not accept param - document', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({
      document: '123.456.789-00'
    }, mockParams))
    expect(httpResponse).toEqual(badRequest(new NotAcceptParamError('document')))
  })

  test('Should return 400 if is missing a paramet not accept param - donation_link', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({
      type: 'PERSON',
      donation_link: 'any_link.com.br'
    }, mockParams))
    expect(httpResponse).toEqual(badRequest(new NotAcceptParamError('donation_link')))
  })

  test('Should return 404 if user doesnt exist', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'update').mockImplementationOnce(async () =>
      Promise.resolve({
        status: UpdateUserResultStatusOptions.user_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody, mockParams))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('User', mockParams.id)))
  })

  test('Should return 400 if any field value already exists', async () => {
    const { sut, updateUserUseCaseStub } = makeSut()
    jest.spyOn(updateUserUseCaseStub, 'update').mockImplementationOnce(async () =>
      Promise.resolve({
        status: UpdateUserResultStatusOptions.unique_key_field
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody, mockParams))
    expect(httpResponse).toEqual(badRequest(new WrongParamError(UpdateUserResultStatusOptions.unique_key_field)))
  })

  test('Should return 200 if is a success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody, mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: mockUser('person')
    }))
  })
})
