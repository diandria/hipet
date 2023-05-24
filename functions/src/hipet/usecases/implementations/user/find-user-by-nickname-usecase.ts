import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { FindUserByNicknameResult, FindUserByNicknameResultStatusOptions, FindUserByNicknameUseCaseInterface, FindUserByNicknameRequest } from '../../interfaces/user'
import { CryptographService } from '../../../services/interfaces'
import { User } from '../../../schemata/entities'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
}

export class FindUserByNicknameUseCase implements FindUserByNicknameUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
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
    if (userDTO.picture) user.picture = userDTO.picture

    return user
  }

  async find (userRequest: FindUserByNicknameRequest): Promise<FindUserByNicknameResult> {
    const user = await this.userRepository.findUserBy('nickname', userRequest.nickname)
    if (!user) {
      return {
        status: FindUserByNicknameResultStatusOptions.user_not_found
      }
    }

    return {
      status: FindUserByNicknameResultStatusOptions.success,
      user: this.to_user(user)
    }
  }
}
