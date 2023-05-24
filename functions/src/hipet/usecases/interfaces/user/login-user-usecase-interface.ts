import { SimpleUser } from '../../../schemata/entities'

export type LoginUserRequest = {
  email: string
  password: string
}

export enum LoginUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND',
  wrong_password = 'WRONG_PASSWORD',
}

export type LoginUserResult = {
  status: LoginUserResultStatusOptions
  authentication_code?: String
  user?: SimpleUser
}

export interface LoginUserUseCaseInterface {
  authenticate: (userRequest: LoginUserRequest) => Promise<LoginUserResult>
}
