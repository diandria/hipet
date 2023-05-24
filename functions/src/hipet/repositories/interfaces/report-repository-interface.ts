import { ReportDTO } from '../models'

export interface ReportRepository {
  add(report: ReportDTO): Promise<ReportDTO>
  findReportBy(field: string, value: any): Promise<ReportDTO>
  delete(reportId: string): Promise<boolean>
  listByPost(postId: string, limit?: number): Promise<ReportDTO[]>
}
