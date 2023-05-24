import { ReportDTO } from '../../../repositories/models'
import { ReportRepository } from '../../../repositories/interfaces'
import { FindReportByIdResult, FindReportByIdResultStatusOptions, FindReportByIdUseCaseInterface, FindReportByIdRequest } from '../../interfaces'
import { Report } from '../../../schemata/entities'

type Dependencies = {
  reportRepository: ReportRepository
}

export class FindReportByIdUseCase implements FindReportByIdUseCaseInterface {
  private readonly reportRepository: ReportRepository

  constructor (dependencies: Dependencies) {
    this.reportRepository = dependencies.reportRepository
  }

  private to_report (reportDTO: ReportDTO): Report {
    const report = new Report()
    report.id = reportDTO._id
    report.post_id = reportDTO.post_id
    report.created_at = reportDTO.created_at
    if (reportDTO.description) report.description = reportDTO.description

    return report
  }

  async find (reportRequest: FindReportByIdRequest): Promise<FindReportByIdResult> {
    const report = await this.reportRepository.findReportBy('_id', reportRequest.id)
    if (!report) {
      return {
        status: FindReportByIdResultStatusOptions.report_not_found
      }
    }

    return {
      status: FindReportByIdResultStatusOptions.success,
      report: this.to_report(report)
    }
  }
}
