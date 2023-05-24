import { PostDTO, ReportDTO, UserDTO } from '../../../repositories/models'
import { PostRepository, ReportRepository, UserRepository } from '../../../repositories/interfaces'
import { ListPostByUserResult, ListPostByUserResultStatusOptions, ListPostByUserUseCaseInterface, ListPostByUserRequest } from '../../interfaces'
import { Post, BasicUser, Report } from '../../../schemata/entities'
import { generate_share_url } from '../../../logic'

type Dependencies = {
  postRepository: PostRepository
  userRepository: UserRepository
  reportRepository: ReportRepository
}

export class ListPostByUserUseCase implements ListPostByUserUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly userRepository: UserRepository
  private readonly reportRepository: ReportRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.userRepository = dependencies.userRepository
    this.reportRepository = dependencies.reportRepository
  }

  private to_report (reportDTO: ReportDTO): Report {
    const report = new Report()
    report.id = reportDTO._id
    report.post_id = reportDTO.post_id
    report.created_at = reportDTO.created_at
    if (reportDTO.description) report.description = reportDTO.description

    return report
  }

  private to_basic_user (userDTO: UserDTO): BasicUser {
    const user = new BasicUser()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link
    if (userDTO.picture) user.picture = userDTO.picture

    return user
  }

  private to_post (postDTO: PostDTO, userDTO: UserDTO, reportList: ReportDTO[]): Post {
    const post = new Post()
    post.id = postDTO._id
    post.user = this.to_basic_user(userDTO)
    post.animal = postDTO.animal
    post.state = postDTO.state
    post.description = postDTO.description
    post.created_at = new Date()
    post.reports = reportList.map(reportDto => this.to_report(reportDto))
    post.share_url = generate_share_url(postDTO._id)
    if (postDTO.picture) post.picture = postDTO.picture
    return post
  }

  async list (reportRequest: ListPostByUserRequest): Promise<ListPostByUserResult> {
    const userDTO = await this.userRepository.findUserBy('_id', reportRequest.customer_id)
    if (!userDTO) return { status: ListPostByUserResultStatusOptions.user_not_found }
    
    const posts = await this.postRepository.listBy('customer_id', reportRequest.customer_id)

    const postUserReportPromises = posts.map(async (postDTO) => {
      const reportList = await this.reportRepository.listByPost(postDTO._id)
      return this.to_post(postDTO, userDTO, reportList)
    })
  
    const list = await Promise.all(postUserReportPromises)

    return {
      status: ListPostByUserResultStatusOptions.success,
      posts: list
    }
  }
}
