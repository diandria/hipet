import { PostRepository, ReportRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { ListPostByUserResultStatusOptions, ListPostByUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { ListPostByUserUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, ReportRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: ListPostByUserUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepository
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new ListPostByUserUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub, reportRepository: reportRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub,
    reportRepositoryStub
  }
}

const makePostRequest = {
  customer_id: '00000000-0000-0000-0000-000000000000'
}

describe('Post - Use Case', () => {
  describe('List Post By Animal Type', () => {
    test('Should return USER_NOT_FOUND status if user id doesnt exists', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null)

      const createPostResult = await sut.list(makePostRequest)
      expect(createPostResult).toEqual({
        status: ListPostByUserResultStatusOptions.user_not_found
      })
    })

    test('Should return SUCCESS status and the correct data post list', async () => {
      const { sut } = makeSut()
      const createPostResult = await sut.list(makePostRequest)

      expect(createPostResult.status).toEqual(ListPostByUserResultStatusOptions.success)
      expect(createPostResult.posts.length).toEqual(1)
    })
  })
})
