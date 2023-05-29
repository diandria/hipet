import { PostRepository } from '../../../hipet/repositories/interfaces'
import { StorageService } from '../../../hipet/services/interfaces'
import { DeletePostResultStatusOptions, DeletePostUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { DeletePostUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub } from '../../mocks/repositories'
import { StorageServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: DeletePostUseCaseInterface
  postRepositoryStub: PostRepository
  storageServiceStub: StorageService
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const storageServiceStub = new StorageServiceStub()

  const sut = new DeletePostUseCase({ storageService: storageServiceStub, postRepository: postRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    storageServiceStub
  }
}

const makePostRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('Post - Use Case', () => {
  describe('Delete Post', () => {
    test('Should return POST_NOT_FOUND status if post doesnt exist', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'findPostBy').mockImplementationOnce(null)

      const DeletePostResult = await sut.delete(makePostRequest)
      expect(DeletePostResult).toEqual({
        status: DeletePostResultStatusOptions.post_not_found
      })
    })

    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'delete').mockImplementationOnce(async () => null) // throw

      const deletePostResult = await sut.delete(makePostRequest)
      expect(deletePostResult).toEqual({
        status: DeletePostResultStatusOptions.repository_error
      })
    })

    test('Should return STORAGE_ERROR status if deleteImg method from storage service throws', async () => {
      const { sut, storageServiceStub } = makeSut()
      jest.spyOn(storageServiceStub, 'deleteImg').mockImplementationOnce(async () => false) // throw

      const deletePostResult = await sut.delete(makePostRequest)
      expect(deletePostResult).toEqual({
        status: DeletePostResultStatusOptions.storage_error
      })
    })

    test('Should return SUCCESS status and the correct data post - Person', async () => {
      const { sut } = makeSut()
      const DeletePostResult = await sut.delete(makePostRequest)

      expect(DeletePostResult.status).toEqual(DeletePostResultStatusOptions.success)
    })
  })
})
