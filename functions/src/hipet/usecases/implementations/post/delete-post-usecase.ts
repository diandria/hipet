import { PostRepository } from '../../../repositories/interfaces'
import { StorageService } from '../../../services/interfaces'
import { DeletePostResult, DeletePostResultStatusOptions, DeletePostUseCaseInterface, DeletePostRequest } from '../../interfaces'

type Dependencies = {
  postRepository: PostRepository
  storageService: StorageService
}

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly storageService: StorageService

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.storageService = dependencies.storageService


  }

  async delete (postRequest: DeletePostRequest): Promise<DeletePostResult> {
    const post = await this.postRepository.findPostBy('_id', postRequest.id)
    if (!post) {
      return {
        status: DeletePostResultStatusOptions.post_not_found
      }
    }

    const deletedPost = await this.postRepository.delete(postRequest.id)
    if (!deletedPost) {
      return {
        status: DeletePostResultStatusOptions.repository_error
      }
    }

    const deletedPicture = await this.storageService.deleteImg(post._id, 'post')
    if (!deletedPicture) {
      return {
        status: DeletePostResultStatusOptions.storage_error
      }
    }

    return {
      status: DeletePostResultStatusOptions.success
    }
  }
}
