export type ReasonOptions = 'PUBLICACAO_SUSPEITA' | 'VENDA_DE_ANIMAL' | 'MAUS_TRATOS' | 'SPAM' | 'OUTRO'

export class Report {
  id: string
  post_id: string
  reason: ReasonOptions
  description?: string
  created_at: Date
}
