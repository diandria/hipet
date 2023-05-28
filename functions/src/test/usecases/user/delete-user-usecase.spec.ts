import { PostRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { StorageService } from '../../../hipet/services/interfaces'
import { DeleteUserResultStatusOptions, DeleteUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { DeleteUserUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'
import { StorageServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: DeleteUserUseCaseInterface
  userRepositoryStub: UserRepository
  postRepositoryStub: PostRepository
  storageServiceStub: StorageService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const postRepositoryStub = new PostRepositoryStub()
  const storageServiceStub = new StorageServiceStub()

  const sut = new DeleteUserUseCase({ userRepository: userRepositoryStub, storageService: storageServiceStub, postRepository: postRepositoryStub })
  return {
    sut,
    userRepositoryStub,
    postRepositoryStub,
    storageServiceStub
  }
}

const makeUserRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('User - Use Case', () => {
  describe('Delete User', () => {
    test('Should return USER_NOT_FOUND status if user doesnt exist', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null)

      const DeleteUserResult = await sut.delete(makeUserRequest)
      expect(DeleteUserResult).toEqual({
        status: DeleteUserResultStatusOptions.user_not_found
      })
    })

    test('Should return USER_REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'delete').mockImplementationOnce(async () => null) // throw

      const deleteUserResult = await sut.delete(makeUserRequest)
      expect(deleteUserResult).toEqual({
        status: DeleteUserResultStatusOptions.user_repository_error
      })
    })

    test('Should return POST_REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'deleteAll').mockImplementationOnce(async () => null) // throw

      const deleteUserResult = await sut.delete(makeUserRequest)
      expect(deleteUserResult).toEqual({
        status: DeleteUserResultStatusOptions.post_repository_error
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut } = makeSut()
      const DeleteUserResult = await sut.delete(makeUserRequest)

      expect(DeleteUserResult.status).toEqual(DeleteUserResultStatusOptions.success)
    })
  })
})
