import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, UserRequest } from '../../interfaces/user'
import { CryptographService, StorageService, UuidService } from '../../../services/interfaces'
import { UserOng, UserPerson, UserTypeOptions } from '../../../schemata/entities'
import { defaultUserImage } from '../../../../../config/defaults/images'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
  storageService: StorageService
  uuidService: UuidService
}

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService
  private readonly storageService: StorageService
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
    this.storageService = dependencies.storageService
    this.uuidService = dependencies.uuidService
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

  async create (userRequest: UserRequest): Promise<CreateUserResult> {
    const userDTO = new UserDTO()

    userDTO._id = this.uuidService.uuid()
    userDTO.type = userRequest.type === 'PERSON' ? UserTypeOptions.person : UserTypeOptions.ong
    userDTO.name = userRequest.name
    userDTO.email = userRequest.email
    userDTO.nickname = userRequest.nickname
    userDTO.phone_number = userRequest.phone_number
    userDTO.password = this.crytographService.encrypt(userRequest.password)
    userDTO.created_at = new Date()

    const isEmailUsed = await this.userRepository.findUserBy('email', userDTO.email)
    const isNickNameUsed = await this.userRepository.findUserBy('nickname', userDTO.nickname)

    if (isEmailUsed || isNickNameUsed) return { status: CreateUserResultStatusOptions.unique_key_field }

    if (userDTO.type === UserTypeOptions.person) {
      userDTO.document = this.crytographService.encrypt(userRequest.document)
      const isDocumentUsed = userRequest.type === 'PERSON' ? await this.userRepository.findUserBy('document', userDTO.document) : null
      if (isDocumentUsed) return { status: CreateUserResultStatusOptions.unique_key_field }
    } else if (userDTO.type === UserTypeOptions.ong) {
      userDTO.donation_link = userRequest.donation_link
    }

    const picture = userRequest.picture ? await this.storageService.saveImg(userRequest.picture, userDTO._id, 'user') : defaultUserImage
    userDTO.picture = picture

    const createdUser = await this.userRepository.add(userDTO)
    if (!createdUser) return { status: CreateUserResultStatusOptions.repository_error }

    return {
      status: CreateUserResultStatusOptions.success,
      user: this.to_user(createdUser)
    }
  }
}
