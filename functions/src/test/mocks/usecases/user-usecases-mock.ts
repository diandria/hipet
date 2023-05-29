import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, DeleteUserResult, DeleteUserResultStatusOptions, DeleteUserUseCaseInterface, FindUserByIdResult, FindUserByIdResultStatusOptions, FindUserByIdUseCaseInterface, FindUserByNicknameResult, FindUserByNicknameResultStatusOptions, FindUserByNicknameUseCaseInterface, LoginUserResult, LoginUserResultStatusOptions, LoginUserUseCaseInterface, UpdateUserResult, UpdateUserResultStatusOptions, UpdateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockSimpleUser, mockUser } from '../schemata/entities'

export const makeCreateUserUseCase = (): CreateUserUseCaseInterface => {
  class CreateUserUseCaseStub implements CreateUserUseCaseInterface {
    async create (): Promise<CreateUserResult> {
      return {
        status: CreateUserResultStatusOptions.success,
        user: mockUser('person')
      }
    }
  }
  return new CreateUserUseCaseStub()
}

export const makeDeleteUserUseCase = (): DeleteUserUseCaseInterface => {
  class DeleteUserUseCaseStub implements DeleteUserUseCaseInterface {
    async delete (): Promise<DeleteUserResult> {
      return {
        status: DeleteUserResultStatusOptions.success
      }
    }
  }
  return new DeleteUserUseCaseStub()
}

export const makeFindUserByIdUseCase = (): FindUserByIdUseCaseInterface => {
  class FindUserByIdUseCaseStub implements FindUserByIdUseCaseInterface {
    async find (): Promise<FindUserByIdResult> {
      return {
        status: FindUserByIdResultStatusOptions.success,
        user: mockUser('person')
      }
    }
  }
  return new FindUserByIdUseCaseStub()
}

export const makeFindUserByNicknameUseCase = (): FindUserByNicknameUseCaseInterface => {
  class FindUserByNicknameUseCaseStub implements FindUserByNicknameUseCaseInterface {
    async find (): Promise<FindUserByNicknameResult> {
      return {
        status: FindUserByNicknameResultStatusOptions.success,
        user: mockUser('person')
      }
    }
  }
  return new FindUserByNicknameUseCaseStub()
}

export const makeUpdateUserUseCase = (): UpdateUserUseCaseInterface => {
  class UpdateUserUseCaseStub implements UpdateUserUseCaseInterface {
    async update (): Promise<UpdateUserResult> {
      return {
        status: UpdateUserResultStatusOptions.success,
        user: mockUser('person')
      }
    }
  }
  return new UpdateUserUseCaseStub()
}

export const makeLoginUserUseCase = (): LoginUserUseCaseInterface => {
  class LoginUserUseCaseStub implements LoginUserUseCaseInterface {
    async authenticate (): Promise<LoginUserResult> {
      return {
        status: LoginUserResultStatusOptions.success,
        user: mockSimpleUser()
      }
    }
  }
  return new LoginUserUseCaseStub()
}
