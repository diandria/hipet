import { User } from '../../../schemata/entities'

export type UserRequest = {
  type: string
  name: string
  email: string
  nickname: string
  phone_number: string
  password: string
  donation_link?: string
  document?: string
  picture?: string
}

export enum CreateUserResultStatusOptions {
  success = 'SUCCESS',
  unique_key_field = 'UNIQUE_KEY_FIELD',
  repository_error = 'REPOSITORY_ERROR'
}

export type CreateUserResult = {
  status: CreateUserResultStatusOptions
  user?: User
}

export interface CreateUserUseCaseInterface {
  create: (userRequest: UserRequest) => Promise<CreateUserResult>
}
