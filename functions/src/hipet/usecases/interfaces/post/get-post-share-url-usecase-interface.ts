export type GetPostShareUrlRequest = {
  id: string
}

export enum GetPostShareUrlResultStatusOptions {
  success = 'SUCCESS',
  post_not_found = 'POST_NOT_FOUND',
  repository_error = 'REPOSITORY_ERROR'
}

export type GetPostShareUrlResult = {
  status: GetPostShareUrlResultStatusOptions
  share_url?: String
}

export interface GetPostShareUrlUseCaseInterface {
  find: (postRequest: GetPostShareUrlRequest) => Promise <GetPostShareUrlResult>
}
