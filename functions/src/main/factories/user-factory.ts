import { CreateUserController, FindUserByIdController, FindUserByNicknameController, UpdateUserController, DeleteUserController, LoginUserController } from '../../hipet/controllers'
import { MongoPostRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { GoogleStorageService, NodeCryptographService } from '../../hipet/services/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateUserUseCase, FindUserByIdUseCase, FindUserByNicknameUseCase, UpdateUserUseCase, DeleteUserUseCase, LoginUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const storageService = new GoogleStorageService()
  const userUseCases = new CreateUserUseCase({ userRepository, crytographService, uuidService, storageService })

  return new CreateUserController(userUseCases)
}

export const makeFindUserByIdController = (): FindUserByIdController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new FindUserByIdUseCase({ userRepository, crytographService })

  return new FindUserByIdController(userUseCases)
}

export const makeFindUserByNicknameController = (): FindUserByNicknameController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new FindUserByNicknameUseCase({ userRepository, crytographService })

  return new FindUserByNicknameController(userUseCases)
}

export const makeUpdateUserController = (): UpdateUserController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const storageService = new GoogleStorageService()
  const userUseCases = new UpdateUserUseCase({ userRepository, crytographService, storageService })

  return new UpdateUserController(userUseCases)
}

export const makeDeleteUserController = (): DeleteUserController => {
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const storageService = new GoogleStorageService()
  const userUseCases = new DeleteUserUseCase({ userRepository, postRepository, storageService })

  return new DeleteUserController(userUseCases)
}

export const makeLoginUserController = (): LoginUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new LoginUserUseCase({ userRepository, crytographService, uuidService })

  return new LoginUserController(userUseCases)
}
