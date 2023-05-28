import { Post, StateOptions } from '../../../../hipet/schemata/entities'
import { mockAnimal } from './animal-mock'
import { mockBasicUser } from './user-mock'

export const mockPost = (): Post => {
  const post = new Post()
  post.id = '00000000-0000-0000-0000-000000000000'
  post.user = mockBasicUser('person')
  post.animal = mockAnimal()
  post.state = StateOptions.sp
  post.picture = 'any_url.com.br'
  post.description = 'any_description'
  post.created_at = new Date('2022')
  post.reports = []
  post.share_url = 'any_share_url.com.br'
  return post
}
