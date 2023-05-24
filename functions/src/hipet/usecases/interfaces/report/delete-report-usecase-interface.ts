export type DeleteReportRequest = {
  id: string
}

export enum DeleteReportResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
  report_not_found = 'REPORT_NOT_FOUND'
}

export type DeleteReportResult = {
  status: DeleteReportResultStatusOptions
}

export interface DeleteReportUseCaseInterface {
  delete: (reportRequest: DeleteReportRequest) => Promise<DeleteReportResult>
}
