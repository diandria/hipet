import { ReportRepository } from '../../../hipet/repositories/interfaces'
import { ReportDTO } from '../../../hipet/repositories/models'
import { mockReportDTO } from './models'

export class ReportRepositoryStub implements ReportRepository {
  async add (report: ReportDTO): Promise<ReportDTO> {
    return mockReportDTO()
  }

  async findReportBy (field: string, value: any): Promise<ReportDTO> {
    return mockReportDTO()
  }

  async listByPost (postId: string, limit?: number): Promise<ReportDTO[]> {
    return [mockReportDTO()]
  }

  async delete (reportId: string): Promise<boolean> {
    return true
  }
}
