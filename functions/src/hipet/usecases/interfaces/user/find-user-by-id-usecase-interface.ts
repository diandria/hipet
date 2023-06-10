import { UserOng, UserPerson } from '../../../schemata/entities'

export type FindUserByIdRequest = {
  id: string
}

export enum FindUserByIdResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND',
}

export type FindUserByIdResult = {
  status: FindUserByIdResultStatusOptions
  user?: UserPerson | UserOng
}

export interface FindUserByIdUseCaseInterface {
  find: (userRequest: FindUserByIdRequest) => Promise <FindUserByIdResult>
}
