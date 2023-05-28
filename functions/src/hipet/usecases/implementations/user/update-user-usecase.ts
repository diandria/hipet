import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { UpdateUserResult, UpdateUserResultStatusOptions, UpdateUserUseCaseInterface, UpdateUserRequest } from '../../interfaces/user'
import { CryptographService, StorageService } from '../../../services/interfaces'
import { User } from '../../../schemata/entities'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
  storageService: StorageService
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService
  private readonly storageService: StorageService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
    this.storageService = dependencies.storageService
  }

  private to_user (userDTO: UserDTO): User {
    const user = new User()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    user.password = this.crytographService.decrypt(userDTO.password)
    user.created_at = userDTO.created_at
    if (userDTO.document) user.document = this.crytographService.decrypt(userDTO.document)
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link
    if (userDTO.disabled_at) user.disabled_at = userDTO.disabled_at
    if (userDTO.picture) { user.picture = userDTO.picture }

    return user
  }

  async update (userRequest: UpdateUserRequest): Promise<UpdateUserResult> {
    const userDTO = new UserDTO()

    if (userRequest.name) userDTO.name = userRequest.name
    if (userRequest.email) {
      if (await this.userRepository.findUserBy('email', userRequest.email)) {
        return {
          status: UpdateUserResultStatusOptions.unique_key_field
        }
      }
      userDTO.email = userRequest.email
    }
    if (userRequest.nickname) {
      if (await this.userRepository.findUserBy('nickname', userRequest.nickname)) {
        return {
          status: UpdateUserResultStatusOptions.unique_key_field
        }
      }
      userDTO.nickname = userRequest.nickname
    }
    if (userRequest.phone_number) userDTO.phone_number = userRequest.phone_number
    if (userRequest.password) userDTO.password = this.crytographService.encrypt(userRequest.password)
    if (userRequest.donation_link) userDTO.donation_link = userRequest.donation_link

    if (userRequest.picture) {
      const picture = await this.storageService.saveImg(userRequest.picture, userRequest.id, 'user')
      userDTO.picture = picture
    }

    const updatedUser = await this.userRepository.updateBy('_id', userRequest.id, userDTO)
    if (!updatedUser) {
      return {
        status: UpdateUserResultStatusOptions.user_not_found
      }
    }

    return {
      status: UpdateUserResultStatusOptions.success,
      user: this.to_user(updatedUser)
    }
  }
}
