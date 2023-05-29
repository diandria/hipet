import {
  CreateReportResult, CreateReportResultStatusOptions, CreateReportUseCaseInterface,
  DeleteReportResult, DeleteReportResultStatusOptions, DeleteReportUseCaseInterface,
  FindReportByIdResult, FindReportByIdResultStatusOptions, FindReportByIdUseCaseInterface
} from '../../../hipet/usecases/interfaces'
import { mockReport } from '../schemata/entities'

export const makeCreateReportUseCase = (): CreateReportUseCaseInterface => {
  class CreateReportUseCaseStub implements CreateReportUseCaseInterface {
    async create (): Promise<CreateReportResult> {
      return {
        status: CreateReportResultStatusOptions.success,
        report: mockReport()
      }
    }
  }
  return new CreateReportUseCaseStub()
}

export const makeDeleteReportUseCase = (): DeleteReportUseCaseInterface => {
  class DeleteReportUseCaseStub implements DeleteReportUseCaseInterface {
    async delete (): Promise<DeleteReportResult> {
      return {
        status: DeleteReportResultStatusOptions.success
      }
    }
  }
  return new DeleteReportUseCaseStub()
}

export const makeFindReportByIdUseCase = (): FindReportByIdUseCaseInterface => {
  class FindReportByIdUseCaseStub implements FindReportByIdUseCaseInterface {
    async find (): Promise<FindReportByIdResult> {
      return {
        status: FindReportByIdResultStatusOptions.success,
        report: mockReport()
      }
    }
  }
  return new FindReportByIdUseCaseStub()
}
