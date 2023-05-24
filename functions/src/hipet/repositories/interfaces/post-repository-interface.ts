import { PostDTO } from '../models'

export interface PostRepository {
  add(report: PostDTO): Promise<PostDTO>
  findPostBy(field: string, value: any): Promise<PostDTO>
  delete(reportId: string): Promise<boolean>
  deleteAll(field: string, value: string): Promise<boolean>
  listBy(field: string, value: string): Promise<PostDTO[]>
  listAll(limit?: number): Promise<PostDTO[]>
}
