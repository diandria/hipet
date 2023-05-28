import { ReportDTO } from '../../../../hipet/repositories/models'
import { ReasonOptions } from '../../../../hipet/schemata/entities'

export const mockReportDTO = (): ReportDTO => {
  const reportDTO = new ReportDTO()
  reportDTO._id = '00000000-0000-0000-0000-000000000000'
  reportDTO.post_id = '00000000-0000-0000-0000-000000000000'
  reportDTO.reason = ReasonOptions.other
  reportDTO.description = 'any_description'
  reportDTO.created_at = new Date(2023)

  return reportDTO
}
