import { UserRepository } from '../../../hipet/repositories/interfaces'
import { UserDTO } from '../../../hipet/repositories/models'
import { mockUserDTO } from './models'

export class UserRepositoryStub implements UserRepository {
  async add (user: UserDTO): Promise<UserDTO> {
    return mockUserDTO('person')
  }

  async findUserBy (field: string, value: any): Promise<UserDTO> {
    return mockUserDTO('person')
  }

  async updateBy (field: string, value: any, user: UserDTO): Promise<UserDTO> {
    return mockUserDTO('person')
  }

  async delete (customerId: string): Promise<boolean> {
    return true
  }
}
