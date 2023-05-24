import { ReportDTO } from '../../../repositories/models'
import { PostRepository, ReportRepository } from '../../../repositories/interfaces'
import { CreateReportResult, CreateReportResultStatusOptions, CreateReportUseCaseInterface, ReportRequest } from '../../interfaces/report'
import { Report } from '../../../schemata/entities'
import { UuidService } from '../../../services/interfaces'

type Dependencies = {
  reportRepository: ReportRepository
  postRepository: PostRepository
  uuidService: UuidService
}

export class CreateReportUseCase implements CreateReportUseCaseInterface {
  private readonly reportRepository: ReportRepository
  private readonly postRepository: PostRepository
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.reportRepository = dependencies.reportRepository
    this.postRepository = dependencies.postRepository
    this.uuidService = dependencies.uuidService
  }

  private to_report (reportDTO: ReportDTO): Report {
    const report = new Report()
    report.id = reportDTO._id
    report.reason = reportDTO.reason
    report.created_at = reportDTO.created_at
    if (reportDTO.description) report.description = reportDTO.description

    return report
  }

  async create (reportRequest: ReportRequest): Promise<CreateReportResult> {
    const reportDTO = new ReportDTO()

    reportDTO._id = this.uuidService.uuid()
    reportDTO.post_id = reportRequest.post_id
    reportDTO.reason = reportRequest.reason
    reportDTO.created_at = new Date()
    if (reportRequest.description) reportDTO.description = reportRequest.description

    const postExists = await this.postRepository.findPostBy('_id', reportDTO.post_id)

    if (!postExists) {
      return {
        status: CreateReportResultStatusOptions.post_not_found
      }
    }

    const createdReport = await this.reportRepository.add(reportDTO)
    if (!createdReport) {
      return {
        status: CreateReportResultStatusOptions.repository_error
      }
    }

    return {
      status: CreateReportResultStatusOptions.success,
      report: this.to_report(createdReport)
    }
  }
}
