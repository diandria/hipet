import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { serverError, success, notFound } from '../../../../config/controllers/helpers/http-helpers'
import { CreatePostController } from '../../../hipet/controllers'
import { StateOptions } from '../../../hipet/schemata/entities'
import { CreatePostResultStatusOptions, CreatePostUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockAnimal, mockPost } from '../../mocks/schemata/entities'
import { makeCreatePostUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: CreatePostController
  createPostUseCaseStub: CreatePostUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createPostUseCaseStub = makeCreatePostUseCase()
  const sut = new CreatePostController(createPostUseCaseStub)
  return {
    sut,
    createPostUseCaseStub
  }
}

const mockBody = {
  customer_id: '00000000-0000-0000-0000-000000000000',
  animal: mockAnimal(),
  state: StateOptions.sp,
  picture: 'any_picture_in_base64',
  description: 'any_description'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create Post Controller', () => {
  test('Should return 500 if CreatePostUseCase throws', async () => {
    const { sut, createPostUseCaseStub } = makeSut()
    jest.spyOn(createPostUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if user doesnt exist', async () => {
    const { sut, createPostUseCaseStub } = makeSut()
    jest.spyOn(createPostUseCaseStub, 'create').mockImplementationOnce(async () =>
      Promise.resolve({
        status: CreatePostResultStatusOptions.user_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('User', mockBody.customer_id)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      post: mockPost()
    }))
  })
})
