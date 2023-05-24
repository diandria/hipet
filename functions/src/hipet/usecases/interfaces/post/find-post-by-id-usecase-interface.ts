import { Post } from '../../../schemata/entities'

export type FindPostByIdRequest = {
  id: string
}

export enum FindPostByIdResultStatusOptions {
  success = 'SUCCESS',
  post_not_found = 'POST_NOT_FOUND',
  repository_error = 'REPOSITORY_ERROR'
}

export type FindPostByIdResult = {
  status: FindPostByIdResultStatusOptions
  post?: Post
}

export interface FindPostByIdUseCaseInterface {
  find: (postRequest: FindPostByIdRequest) => Promise <FindPostByIdResult>
}
