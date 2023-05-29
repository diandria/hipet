import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { serverError, success, notFound } from '../../../../config/controllers/helpers/http-helpers'
import { DeletePostController } from '../../../hipet/controllers'
import { DeletePostResultStatusOptions, DeletePostUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { makeDeletePostUseCase } from '../../mocks/usecases/post-usecases-mock'

interface SutTypes {
  sut: DeletePostController
  deletePostUseCaseStub: DeletePostUseCaseInterface
}

const makeSut = (): SutTypes => {
  const deletePostUseCaseStub = makeDeletePostUseCase()
  const sut = new DeletePostController(deletePostUseCaseStub)
  return {
    sut,
    deletePostUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (params: any): HttpRequest => ({ params })

describe('Delete Post Controller', () => {
  test('Should return 500 if DeletePostUseCase throws', async () => {
    const { sut, deletePostUseCaseStub } = makeSut()
    jest.spyOn(deletePostUseCaseStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if post doesnt exist', async () => {
    const { sut, deletePostUseCaseStub } = makeSut()
    jest.spyOn(deletePostUseCaseStub, 'delete').mockImplementationOnce(async () =>
      Promise.resolve({
        status: DeletePostResultStatusOptions.post_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('Post', mockParams.id)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
