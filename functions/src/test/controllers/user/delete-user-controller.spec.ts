import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { serverError, success, notFound } from '../../../../config/controllers/helpers/http-helpers'
import { DeleteUserController } from '../../../hipet/controllers'
import { DeleteUserResultStatusOptions, DeleteUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { makeDeleteUserUseCase } from '../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: DeleteUserController
  deleteUserUseCaseStub: DeleteUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const deleteUserUseCaseStub = makeDeleteUserUseCase()
  const sut = new DeleteUserController(deleteUserUseCaseStub)
  return {
    sut,
    deleteUserUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (params: any): HttpRequest => ({ params })

describe('Delete User Controller', () => {
  test('Should return 500 if DeleteUserUseCase throws', async () => {
    const { sut, deleteUserUseCaseStub } = makeSut()
    jest.spyOn(deleteUserUseCaseStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if DeleteUserUseCase throws', async () => {
    const { sut, deleteUserUseCaseStub } = makeSut()
    jest.spyOn(deleteUserUseCaseStub, 'delete').mockImplementationOnce(async () =>
      Promise.resolve({
        status: DeleteUserResultStatusOptions.user_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('User', mockParams.id)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
