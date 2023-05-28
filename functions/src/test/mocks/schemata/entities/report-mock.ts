import { ReasonOptions, Report } from '../../../../hipet/schemata/entities'

export const mockReport = (): Report => {
  const report = new Report()
  report.id = '00000000-0000-0000-0000-000000000000'
  report.post_id = '00000000-0000-0000-0000-000000000000'
  report.reason = ReasonOptions.other
  report.description = 'any_description'
  report.created_at = new Date(2023)
  return report
}
