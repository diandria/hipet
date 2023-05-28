import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockUser } from '../schemata/entities'

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
