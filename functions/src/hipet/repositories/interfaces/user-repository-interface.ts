import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<UserDTO>
  findUserBy(field: string, value: any): Promise<UserDTO>
  updateBy(field: string, value: any, user: UserDTO): Promise<UserDTO>
  delete(customerId: string): Promise<boolean>
}
