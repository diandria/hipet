import { UserTypeOptions } from '../../schemata/entities'

export class UserDTO {
  _id: string
  type: UserTypeOptions
  name: string
  email: string
  nickname: string
  phone_number: string
  password: string
  donation_link?: string
  document?: string
  created_at: Date
  disabled_at?: Date
  picture?: string
}
