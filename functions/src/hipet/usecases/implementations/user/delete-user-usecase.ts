import { PostRepository, UserRepository } from '../../../repositories/interfaces'
import { StorageService } from '../../../services/interfaces'
import { DeleteUserResult, DeleteUserResultStatusOptions, DeleteUserUseCaseInterface, DeleteUserRequest } from '../../interfaces/user'

type Dependencies = {
  userRepository: UserRepository
  storageService: StorageService
  postRepository: PostRepository
}

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly storageService: StorageService
  private readonly postRepository: PostRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.storageService = dependencies.storageService
    this.postRepository = dependencies.postRepository
  }

  async delete (userRequest: DeleteUserRequest): Promise<DeleteUserResult> {
    const user = await this.userRepository.findUserBy('_id', userRequest.id)
    if (!user) return { status: DeleteUserResultStatusOptions.user_not_found }

    const deletedUser = await this.userRepository.delete(userRequest.id)
    if (!deletedUser) return { status: DeleteUserResultStatusOptions.user_repository_error }

    await this.storageService.deleteImg(user._id, 'user')

    const posts = await this.postRepository.listBy('customer_id', userRequest.id)

    const deletedPosts = await this.postRepository.deleteAll('customer_id', userRequest.id)
    if (!deletedPosts) return { status: DeleteUserResultStatusOptions.post_repository_error }
    
    await Promise.all(posts.map(post => this.storageService.deleteImg(post._id, 'post')));

    return {
      status: DeleteUserResultStatusOptions.success
    }
  }
}
