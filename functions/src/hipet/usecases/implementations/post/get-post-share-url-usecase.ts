import { PostRepository } from '../../../repositories/interfaces'
import { GetPostShareUrlResult, GetPostShareUrlResultStatusOptions, GetPostShareUrlUseCaseInterface, GetPostShareUrlRequest } from '../../interfaces'
import { generate_share_url } from '../../../logic'

type Dependencies = {
  postRepository: PostRepository
}

export class GetPostShareUrlUseCase implements GetPostShareUrlUseCaseInterface {
  private readonly postRepository: PostRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
  }

  async find (reportRequest: GetPostShareUrlRequest): Promise<GetPostShareUrlResult> {
    const postDTO = await this.postRepository.findPostBy('_id', reportRequest.id)
    if (!postDTO) {
      return {
        status: GetPostShareUrlResultStatusOptions.post_not_found
      }
    }

    return {
      status: GetPostShareUrlResultStatusOptions.success,
      share_url: generate_share_url(postDTO._id)
    }
  }
}
