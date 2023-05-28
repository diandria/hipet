import { PostRepository } from '../../../hipet/repositories/interfaces'
import { PostDTO } from '../../../hipet/repositories/models'
import { mockPostDTO } from './models'

export class PostRepositoryStub implements PostRepository {
  async add (post: PostDTO): Promise<PostDTO> {
    return mockPostDTO()
  }

  async findPostBy (field: string, value: any): Promise<PostDTO> {
    return mockPostDTO()
  }

  async listBy (field: string, value: string): Promise<PostDTO[]> {
    return [mockPostDTO()]
  }

  async listAll (limit?: number): Promise<PostDTO[]> {
    return [mockPostDTO(), mockPostDTO()]
  }

  async delete (reportId: string): Promise<boolean> {
    return true
  }

  async deleteAll (field: string, value: string): Promise<boolean> {
    return true
  }
}
