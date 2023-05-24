export type UserTypeOptions = 'PERSON' | 'ONG'

export class User {
  id: string
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

export class SimpleUser {
  id: string
  type: UserTypeOptions
  name: string
  email: string
  nickname: string
  picture?: string
}

export class BasicUser {
  id: string
  type: UserTypeOptions
  name: string
  email: string
  nickname: string
  phone_number: string
  donation_link?: string
  picture?: string
}
