import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { FindUserByIdResult, FindUserByIdResultStatusOptions, FindUserByIdUseCaseInterface, FindUserByIdRequest } from '../../interfaces/user'
import { CryptographService } from '../../../services/interfaces'
import { UserOng, UserPerson, UserTypeOptions } from '../../../schemata/entities'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
}

export class FindUserByIdUseCase implements FindUserByIdUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
  }

  private to_person_user (userDTO: UserDTO): UserPerson {
    const user = new UserPerson()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    user.password = this.crytographService.decrypt(userDTO.password)
    user.created_at = userDTO.created_at
    user.document = this.crytographService.decrypt(userDTO.document)
    if (userDTO.picture) user.picture = userDTO.picture

    return user
  }

  private to_ong_user (userDTO: UserDTO): UserOng {
    const user = new UserOng()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    user.password = this.crytographService.decrypt(userDTO.password)
    user.created_at = userDTO.created_at
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link
    if (userDTO.picture) user.picture = userDTO.picture

    return user
  }

  private to_user (userDTO: UserDTO): UserOng | UserPerson {
    const user = userDTO.type === UserTypeOptions.person ? this.to_person_user(userDTO) : this.to_ong_user(userDTO)

    return user
  }

  async find (userRequest: FindUserByIdRequest): Promise<FindUserByIdResult> {
    const user = await this.userRepository.findUserBy('_id', userRequest.id)
    if (!user) {
      return {
        status: FindUserByIdResultStatusOptions.user_not_found
      }
    }

    return {
      status: FindUserByIdResultStatusOptions.success,
      user: this.to_user(user)
    }
  }
}
