import { Post, Animal, StateOptions } from '../../../schemata/entities'

export type PostRequest = {
  customer_id: string
  animal: Animal
  state: StateOptions
  picture?: string
  description: string
}

export enum CreatePostResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
  not_accepted_param = 'NOT_ACCEPTED_PARAM',
  user_not_found = 'USER_NOT_FOUND'
}

export type CreatePostResult = {
  status: CreatePostResultStatusOptions
  post?: Post
  param?: string
}

export interface CreatePostUseCaseInterface {
  create: (postRequest: PostRequest) => Promise<CreatePostResult>
}
