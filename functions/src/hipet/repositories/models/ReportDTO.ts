import { ReasonOptions } from '../../schemata/entities'

export class ReportDTO {
  _id: string
  post_id: string
  reason: ReasonOptions
  description?: string
  created_at: Date
}
