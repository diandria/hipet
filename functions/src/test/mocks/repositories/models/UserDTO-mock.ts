import { UserDTO } from '../../../../hipet/repositories/models'
import { UserTypeOptions } from '../../../../hipet/schemata/entities'

const mockUserPersonDTO = (): UserDTO => {
  const userDTO = new UserDTO()
  userDTO._id = '00000000-0000-0000-0000-000000000000'
  userDTO.type = UserTypeOptions.person
  userDTO.name = 'any_name'
  userDTO.email = 'any_email@mail.com'
  userDTO.nickname = 'any_nickname'
  userDTO.phone_number = '(00) 1234-5678'
  userDTO.password = 'any_encoded_password'
  userDTO.document = 'any_encoded_document'
  userDTO.created_at = new Date(2023)
  userDTO.picture = 'any_url.com.br'

  return userDTO
}

const mockUserOngDTO = (): UserDTO => {
  const userDTO = new UserDTO()
  userDTO._id = '00000000-0000-0000-0000-000000000000'
  userDTO.type = UserTypeOptions.person
  userDTO.name = 'any_name'
  userDTO.email = 'any_email@mail.com'
  userDTO.nickname = 'any_nickname'
  userDTO.phone_number = '(00) 1234-5678'
  userDTO.password = 'any_encoded_password'
  userDTO.created_at = new Date(2023)
  userDTO.picture = 'any_url.com.br'
  userDTO.donation_link = 'any_donation_url.com.br'

  return userDTO
}

export const mockUserDTO = (type: string): UserDTO => {
  if (type === 'person') {
    return mockUserPersonDTO()
  } else if (type === 'ong') {
    return mockUserOngDTO()
  }
}
