import {
  CreatePostResult, CreatePostResultStatusOptions, CreatePostUseCaseInterface,
  DeletePostResult, DeletePostResultStatusOptions, DeletePostUseCaseInterface,
  FindPostByIdResult, FindPostByIdResultStatusOptions, FindPostByIdUseCaseInterface, ListAllPostResult, ListAllPostResultStatusOptions, ListAllPostUseCaseInterface, ListPostByAnimalTypeResult, ListPostByAnimalTypeResultStatusOptions, ListPostByAnimalTypeUseCaseInterface
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

export const makeListAllPostUseCase = (): ListAllPostUseCaseInterface => {
  class ListAllPostUseCaseStub implements ListAllPostUseCaseInterface {
    async list (): Promise<ListAllPostResult> {
      return {
        status: ListAllPostResultStatusOptions.success,
        posts: [mockPost(), mockPost()]
      }
    }
  }
  return new ListAllPostUseCaseStub()
}

export const makeListPostByAnimalTypeUseCase = (): ListPostByAnimalTypeUseCaseInterface => {
  class ListPostByAnimalTypeUseCaseStub implements ListPostByAnimalTypeUseCaseInterface {
    async list (): Promise<ListPostByAnimalTypeResult> {
      return {
        status: ListPostByAnimalTypeResultStatusOptions.success,
        posts: [mockPost()]
      }
    }
  }
  return new ListPostByAnimalTypeUseCaseStub()
}
