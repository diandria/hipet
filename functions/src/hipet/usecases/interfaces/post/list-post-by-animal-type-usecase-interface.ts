import { AnimalTypeOptions, Post } from '../../../schemata/entities'

export type ListPostByAnimalTypeRequest = {
  limit?: number
  type: AnimalTypeOptions
}

export enum ListPostByAnimalTypeResultStatusOptions {
  success = 'SUCCESS'
}

export type ListPostByAnimalTypeResult = {
  status: ListPostByAnimalTypeResultStatusOptions
  posts?: Post[]
}

export interface ListPostByAnimalTypeUseCaseInterface {
  list: (postRequest: ListPostByAnimalTypeRequest) => Promise <ListPostByAnimalTypeResult>
}
