import { PostRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { StorageService, UuidService } from '../../../hipet/services/interfaces'
import { CreatePostResultStatusOptions, CreatePostUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { Post, StateOptions } from '../../../hipet/schemata/entities'
import { CreatePostUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'
import { StorageServiceStub, UuidServiceStub } from '../../mocks/services'
import { mockAnimal } from '../../mocks/schemata/entities'

interface SutTypes {
  sut: CreatePostUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepository
  storageServiceStub: StorageService
  uuidServiceStub: UuidService
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const storageServiceStub = new StorageServiceStub()
  const uuidServiceStub = new UuidServiceStub()

  const sut = new CreatePostUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub, storageService: storageServiceStub, uuidService: uuidServiceStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub,
    storageServiceStub,
    uuidServiceStub
  }
}

const makePostRequest = {
  customer_id: '00000000-0000-0000-0000-000000000000',
  animal: mockAnimal(),
  state: StateOptions.sp,
  picture: 'any_picture_in_base64',
  description: 'any_description'
}

describe('Post - Use Case', () => {
  describe('Create Post', () => {
    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'add').mockImplementationOnce(async () => null) // throw

      const createPostResult = await sut.create(makePostRequest)
      expect(createPostResult).toEqual({
        status: CreatePostResultStatusOptions.repository_error
      })
    })

    test('Should return USER_NOT_FOUND status if user id doesnt exists', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null)

      const createPostResult = await sut.create(makePostRequest)
      expect(createPostResult).toEqual({
        status: CreatePostResultStatusOptions.user_not_found
      })
    })

    test('Should return SUCCESS status and the correct data post - Person', async () => {
      const { sut } = makeSut()
      const createPostResult = await sut.create(makePostRequest)

      expect(createPostResult.status).toEqual(CreatePostResultStatusOptions.success)
      expect(createPostResult.post).toBeInstanceOf(Post)
    })
  })
})
