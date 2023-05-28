import { BasicUser, SimpleUser, User, UserTypeOptions } from '../../../../hipet/schemata/entities'

const mockPersonUser = (): User => {
  const user = new User()
  user.id = '00000000-0000-0000-0000-000000000000'
  user.type = UserTypeOptions.person
  user.name = 'any_name'
  user.email = 'any_mail@mail.com'
  user.nickname = 'any_nickname'
  user.phone_number = '(00) 00000-0000'
  user.password = 'any_password'
  user.document = '00000000000'
  user.created_at = new Date(2023)
  user.picture = 'any_url.com.br'
  return user
}

const mockOngUser = (): User => {
  const user = new User()
  user.id = '00000000-0000-0000-0000-000000000000'
  user.type = UserTypeOptions.person
  user.name = 'any_name'
  user.email = 'any_mail@mail.com'
  user.nickname = 'any_nickname'
  user.phone_number = '(00) 00000-0000'
  user.password = 'any_password'
  user.donation_link = 'any_donation_url.com.br'
  user.created_at = new Date(2023)
  user.picture = 'any_url.com.br'
  return user
}

const mockBasicPersonUser = (): BasicUser => {
  const user = new User()
  user.id = '00000000-0000-0000-0000-000000000000'
  user.type = UserTypeOptions.person
  user.name = 'any_name'
  user.email = 'any_mail@mail.com'
  user.nickname = 'any_nickname'
  user.phone_number = '(00) 00000-0000'
  user.picture = 'any_url.com.br'
  return user
}

const mockBasicOngUser = (): BasicUser => {
  const user = new User()
  user.id = '00000000-0000-0000-0000-000000000000'
  user.type = UserTypeOptions.person
  user.name = 'any_name'
  user.email = 'any_mail@mail.com'
  user.nickname = 'any_nickname'
  user.phone_number = '(00) 00000-0000'
  user.donation_link = 'any_donation_url.com.br'
  user.picture = 'any_url.com.br'
  return user
}

export const mockUser = (type: string): User => {
  if (type === 'person') {
    return mockPersonUser()
  } else if (type === 'ong') {
    return mockOngUser()
  }
}

export const mockSimpleUser = (): SimpleUser => {
  const user = new User()
  user.id = '00000000-0000-0000-0000-000000000000'
  user.type = UserTypeOptions.person
  user.name = 'any_name'
  user.email = 'any_mail@mail.com'
  user.nickname = 'any_nickname'
  user.picture = 'any_url.com.br'
  return user
}

export const mockBasicUser = (type: string): BasicUser => {
  if (type === 'person') {
    return mockBasicPersonUser()
  } else if (type === 'ong') {
    return mockBasicOngUser()
  }
}
