import { ReportRepository } from '../../../repositories/interfaces'
import { DeleteReportResult, DeleteReportResultStatusOptions, DeleteReportUseCaseInterface, DeleteReportRequest } from '../../interfaces'

type Dependencies = {
  reportRepository: ReportRepository
}

export class DeleteReportUseCase implements DeleteReportUseCaseInterface {
  private readonly reportRepository: ReportRepository

  constructor (dependencies: Dependencies) {
    this.reportRepository = dependencies.reportRepository
  }

  async delete (reportRequest: DeleteReportRequest): Promise<DeleteReportResult> {
    const report = await this.reportRepository.findReportBy('_id', reportRequest.id)
    if (!report) {
      return {
        status: DeleteReportResultStatusOptions.report_not_found
      }
    }

    const deletedReport = await this.reportRepository.delete(reportRequest.id)
    if (!deletedReport) {
      return {
        status: DeleteReportResultStatusOptions.repository_error
      }
    }

    return {
      status: DeleteReportResultStatusOptions.success
    }
  }
}
