import { PostDTO } from '../../../../hipet/repositories/models'
import { StateOptions } from '../../../../hipet/schemata/entities'
import { mockAnimal } from '../../schemata/entities'

export const mockPostDTO = (): PostDTO => {
  const postDTO = new PostDTO()
  postDTO._id = '00000000-0000-0000-0000-000000000000'
  postDTO.customer_id = '00000000-0000-0000-0000-000000000000'
  postDTO.animal = mockAnimal()
  postDTO.state = StateOptions.sp
  postDTO.picture = 'any_url.com.br'
  postDTO.description = 'any_description'
  postDTO.created_at = new Date('2023')
  postDTO.reports_id = []
  postDTO.share_url = 'any_url.com.br/00000000-0000-0000-0000-000000000000'
  return postDTO
}
