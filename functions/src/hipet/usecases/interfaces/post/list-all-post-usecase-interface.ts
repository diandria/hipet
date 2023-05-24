import { Post } from '../../../schemata/entities'

export type ListAllPostRequest = {
  limit?: number
}

export enum ListAllPostResultStatusOptions {
  success = 'SUCCESS'
}

export type ListAllPostResult = {
  status: ListAllPostResultStatusOptions
  posts?: Post[]
}

export interface ListAllPostUseCaseInterface {
  list: (postRequest: ListAllPostRequest) => Promise <ListAllPostResult>
}
