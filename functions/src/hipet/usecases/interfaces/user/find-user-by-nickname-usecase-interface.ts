import { UserOng, UserPerson } from '../../../schemata/entities'

export type FindUserByNicknameRequest = {
  nickname: string
}

export enum FindUserByNicknameResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND',
}

export type FindUserByNicknameResult = {
  status: FindUserByNicknameResultStatusOptions
  user?: UserPerson | UserOng
}

export interface FindUserByNicknameUseCaseInterface {
  find: (userRequest: FindUserByNicknameRequest) => Promise <FindUserByNicknameResult>
}
