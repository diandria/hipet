import {
  CreatePostResult, CreatePostResultStatusOptions, CreatePostUseCaseInterface,
  DeletePostResult, DeletePostResultStatusOptions, DeletePostUseCaseInterface,
  FindPostByIdResult, FindPostByIdResultStatusOptions, FindPostByIdUseCaseInterface
} from '../../../hipet/usecases/interfaces'
import { mockPost } from '../schemata/entities'

export const makeCreatePostUseCase = (): CreatePostUseCaseInterface => {
  class CreatePostUseCaseStub implements CreatePostUseCaseInterface {
    async create (): Promise<CreatePostResult> {
      return {
        status: CreatePostResultStatusOptions.success,
        post: mockPost()
      }
    }
  }
  return new CreatePostUseCaseStub()
}

export const makeDeletePostUseCase = (): DeletePostUseCaseInterface => {
  class DeletePostUseCaseStub implements DeletePostUseCaseInterface {
    async delete (): Promise<DeletePostResult> {
      return {
        status: DeletePostResultStatusOptions.success
      }
    }
  }
  return new DeletePostUseCaseStub()
}

export const makeFindPostByIdUseCase = (): FindPostByIdUseCaseInterface => {
  class FindPostByIdUseCaseStub implements FindPostByIdUseCaseInterface {
    async find (): Promise<FindPostByIdResult> {
      return {
        status: FindPostByIdResultStatusOptions.success,
        post: mockPost()
      }
    }
  }
  return new FindPostByIdUseCaseStub()
}
