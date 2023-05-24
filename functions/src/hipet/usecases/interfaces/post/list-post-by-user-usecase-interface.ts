import { Post } from '../../../schemata/entities'

export type ListPostByUserRequest = {
  limit?: number
  customer_id: string
}

export enum ListPostByUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND'
}

export type ListPostByUserResult = {
  status: ListPostByUserResultStatusOptions
  posts?: Post[]
}

export interface ListPostByUserUseCaseInterface {
  list: (postRequest: ListPostByUserRequest) => Promise <ListPostByUserResult>
}
