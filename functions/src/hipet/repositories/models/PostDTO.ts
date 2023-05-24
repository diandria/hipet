import { Animal, StateOptions } from '../../schemata/entities'

export class PostDTO {
  _id: string
  customer_id: string
  animal: Animal
  state: StateOptions
  picture?: string
  description: string
  created_at: Date
  reports_id: string[]
  share_url: string
}
