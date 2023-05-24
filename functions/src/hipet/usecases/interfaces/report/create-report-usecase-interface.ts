import { ReasonOptions, Report } from '../../../schemata/entities'

export type ReportRequest = {
  post_id: string
  reason: ReasonOptions
  description?: string
}

export enum CreateReportResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
  post_not_found = 'POST_NOT_FOUND'
}

export type CreateReportResult = {
  status: CreateReportResultStatusOptions
  report?: Report
}

export interface CreateReportUseCaseInterface {
  create: (reportRequest: ReportRequest) => Promise<CreateReportResult>
}
