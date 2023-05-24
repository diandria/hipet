export type DeletePostRequest = {
  id: string
}

export enum DeletePostResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
  post_not_found = 'POST_NOT_FOUND',
  storage_error = 'STORAGE_ERROR'
}

export type DeletePostResult = {
  status: DeletePostResultStatusOptions
}

export interface DeletePostUseCaseInterface {
  delete: (postRequest: DeletePostRequest) => Promise<DeletePostResult>
}
