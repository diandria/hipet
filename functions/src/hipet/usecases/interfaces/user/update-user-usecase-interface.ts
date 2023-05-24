import { User } from '../../../schemata/entities'

export type UpdateUserRequest = {
  id: string
  name?: string
  email?: string
  nickname?: string
  phone_number?: string
  password?: string
  donation_link?: string
  picture?: string
}

export enum UpdateUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND',
  unique_key_field = 'UNIQUE_KEY_FIELD',
  repository_error = 'REPOSITORY_ERROR'
}

export type UpdateUserResult = {
  status: UpdateUserResultStatusOptions
  user?: User
}

export interface UpdateUserUseCaseInterface {
  update: (userRequest: UpdateUserRequest) => Promise<UpdateUserResult>
}
