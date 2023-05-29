import { PostRepository, ReportRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { FindPostByIdResultStatusOptions, FindPostByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { FindPostByIdUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, ReportRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: FindPostByIdUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepository
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new FindPostByIdUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub, reportRepository: reportRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub,
    reportRepositoryStub
  }
}

const makePostRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('Post - Use Case', () => {
  describe('Find Post By ID', () => {
    test('Should return POST_NOT_FOUND status if post doesnt exist', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'findPostBy').mockImplementationOnce(null)

      const FindPostByIdResult = await sut.find(makePostRequest)
      expect(FindPostByIdResult).toEqual({
        status: FindPostByIdResultStatusOptions.post_not_found
      })
    })

    test('Should return SUCCESS status and the correct data post - Person', async () => {
      const { sut } = makeSut()
      const FindPostByIdResult = await sut.find(makePostRequest)

      expect(FindPostByIdResult.status).toEqual(FindPostByIdResultStatusOptions.success)
    })
  })
})
