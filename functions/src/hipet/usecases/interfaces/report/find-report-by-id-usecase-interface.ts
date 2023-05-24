import { Report } from '../../../schemata/entities'

export type FindReportByIdRequest = {
  id: string
}

export enum FindReportByIdResultStatusOptions {
  success = 'SUCCESS',
  report_not_found = 'REPORT_NOT_FOUND',
}

export type FindReportByIdResult = {
  status: FindReportByIdResultStatusOptions
  report?: Report
}

export interface FindReportByIdUseCaseInterface {
  find: (reportRequest: FindReportByIdRequest) => Promise <FindReportByIdResult>
}
