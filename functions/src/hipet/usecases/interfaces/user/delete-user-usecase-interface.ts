export type DeleteUserRequest = {
  id: string
}

export enum DeleteUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND',
  user_repository_error = 'USER_REPOSITORY_ERROR',
  post_repository_error = 'POST_REPOSITORY_ERROR',
}

export type DeleteUserResult = {
  status: DeleteUserResultStatusOptions
}

export interface DeleteUserUseCaseInterface {
  delete: (userRequest: DeleteUserRequest) => Promise<DeleteUserResult>
}
