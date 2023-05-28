export enum ReasonOptions {
  suspicious_post = 'PUBLICACAO_SUSPEITA',
  animal_sale = 'VENDA_DE_ANIMAL',
  bad_treatment = 'MAUS_TRATOS',
  spam = 'SPAM',
  other = 'OUTRO'
}

export class Report {
  id: string
  post_id: string
  reason: ReasonOptions
  description?: string
  created_at: Date
}
