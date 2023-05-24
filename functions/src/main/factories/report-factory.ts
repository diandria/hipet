import { CreateReportController, DeleteReportController, FindReportByIdController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository } from '../../hipet/repositories/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateReportUseCase, DeleteReportUseCase, FindReportByIdUseCase } from '../../hipet/usecases/implementations'

export const makeCreateReportController = (): CreateReportController => {
  const uuidService = new NodeUuidService()
  const reportRepository = new MongoReportRepository()
  const postRepository = new MongoPostRepository()
  const reportUseCases = new CreateReportUseCase({ uuidService, reportRepository, postRepository })

  return new CreateReportController(reportUseCases)
}

export const makeFindReportByIdController = (): FindReportByIdController => {
  const reportRepository = new MongoReportRepository()
  const reportUseCases = new FindReportByIdUseCase({ reportRepository })

  return new FindReportByIdController(reportUseCases)
}

export const makeDeleteReportController = (): DeleteReportController => {
  const reportRepository = new MongoReportRepository()
  const reportUseCases = new DeleteReportUseCase({ reportRepository })

  return new DeleteReportController(reportUseCases)
}
