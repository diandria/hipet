import { CreatePostController, DeletePostController, FindPostByIdController, GetPostShareUrlController, ListAllPostController, ListPostByAnimalTypeController, ListPostByUserController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { GoogleStorageService, NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase, DeletePostUseCase, FindPostByIdUseCase, GetPostShareUrlUseCase, ListAllPostUseCase, ListPostByAnimalTypeUseCase, ListPostByUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const storageService = new GoogleStorageService()
  const reportUseCases = new CreatePostUseCase({ postRepository, userRepository, storageService, uuidService })

  return new CreatePostController(reportUseCases)
}

export const makeFindPostByIdController = (): FindPostByIdController => {
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const reportRepository = new MongoReportRepository()
  const postUseCases = new FindPostByIdUseCase({ postRepository, userRepository, reportRepository })

  return new FindPostByIdController(postUseCases)
}

export const makeListAllPostController = (): ListAllPostController => {
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const reportRepository = new MongoReportRepository()
  const postUseCases = new ListAllPostUseCase({ postRepository, userRepository, reportRepository })

  return new ListAllPostController(postUseCases)
}

export const makeListPostByUserController = (): ListPostByUserController => {
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const reportRepository = new MongoReportRepository()
  const postUseCases = new ListPostByUserUseCase({ postRepository, userRepository, reportRepository })

  return new ListPostByUserController(postUseCases)
}

export const makeListPostByAnimalTypeController = (): ListPostByAnimalTypeController => {
  const userRepository = new MongoUserRepository()
  const postRepository = new MongoPostRepository()
  const reportRepository = new MongoReportRepository()
  const postUseCases = new ListPostByAnimalTypeUseCase({ postRepository, userRepository, reportRepository })

  return new ListPostByAnimalTypeController(postUseCases)
}

export const makeGetPostShareUrlController = (): GetPostShareUrlController => {
  const postRepository = new MongoPostRepository()
  const postUseCases = new GetPostShareUrlUseCase({ postRepository })

  return new GetPostShareUrlController(postUseCases)
}

export const makeDeletePostController = (): DeletePostController => {
  const postRepository = new MongoPostRepository()
  const storageService = new GoogleStorageService()
  const reportUseCases = new DeletePostUseCase({ postRepository, storageService })

  return new DeletePostController(reportUseCases)
}
