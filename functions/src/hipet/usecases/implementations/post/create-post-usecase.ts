import { PostDTO, UserDTO } from '../../../repositories/models'
import { PostRepository, UserRepository } from '../../../repositories/interfaces'
import { CreatePostResult, CreatePostResultStatusOptions, CreatePostUseCaseInterface, PostRequest } from '../../interfaces'
import { Animal, Post, BasicUser } from '../../../schemata/entities'
import { generate_share_url } from '../../../logic'
import { StorageService, UuidService } from '../../../services/interfaces'

type Dependencies = {
  postRepository: PostRepository
  userRepository: UserRepository
  storageService: StorageService
  uuidService: UuidService
}

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly userRepository: UserRepository
  private readonly storageService: StorageService
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.userRepository = dependencies.userRepository
    this.storageService = dependencies.storageService
    this.uuidService = dependencies.uuidService
  }

  private to_basic_user (userDTO: UserDTO): BasicUser {
    const user = new BasicUser()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link
    if (userDTO.picture) user.picture = userDTO.picture

    return user
  }

  private to_post (postDTO: PostDTO, userDTO: UserDTO): Post {
    const post = new Post()
    post.id = postDTO._id
    post.user = this.to_basic_user(userDTO)
    post.animal = postDTO.animal
    post.state = postDTO.state
    post.description = postDTO.description
    post.created_at = new Date()
    post.reports = []
    post.share_url = generate_share_url(postDTO._id)
    if (postDTO.picture) post.picture = postDTO.picture
    return post
  }

  async create (postRequest: PostRequest): Promise<CreatePostResult> {
    const postDTO = new PostDTO()
    const animal = new Animal()

    const user = await this.userRepository.findUserBy('_id', postRequest.customer_id)
    if (!user) {
      return {
        status: CreatePostResultStatusOptions.user_not_found
      }
    }

    animal.name = postRequest.animal.name
    animal.color = postRequest.animal.color
    animal.size = postRequest.animal.size
    animal.health_info = postRequest.animal.health_info
    animal.type = postRequest.animal.type
    animal.sex = postRequest.animal.sex
    if (postRequest.animal.age) animal.age = postRequest.animal.age
    postDTO._id = this.uuidService.uuid()
    postDTO.customer_id = postRequest.customer_id
    postDTO.state = postRequest.state
    postDTO.description = postRequest.description
    postDTO.animal = animal
    postDTO.created_at = new Date()
    if (postRequest.picture) {
      const picture = await this.storageService.saveImg(postRequest.picture, postDTO._id, 'post')
      postDTO.picture = picture
    }

    const createdPost = await this.postRepository.add(postDTO)
    if (!createdPost) {
      return {
        status: CreatePostResultStatusOptions.repository_error
      }
    }

    return {
      status: CreatePostResultStatusOptions.success,
      post: this.to_post(createdPost, user)
    }
  }
}
