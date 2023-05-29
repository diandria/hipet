import { PostRepository, ReportRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { ListAllPostResultStatusOptions, ListAllPostUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { ListAllPostUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, ReportRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: ListAllPostUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepository
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new ListAllPostUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub, reportRepository: reportRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub,
    reportRepositoryStub
  }
}

const makePostRequest = {}

describe('Post - Use Case', () => {
  describe('ListAll Post', () => {
    test('Should return SUCCESS status and the correct data post - Person', async () => {
      const { sut } = makeSut()
      const createPostResult = await sut.list(makePostRequest)

      expect(createPostResult.status).toEqual(ListAllPostResultStatusOptions.success)
      expect(createPostResult.posts.length).toEqual(2)
    })
  })
})
