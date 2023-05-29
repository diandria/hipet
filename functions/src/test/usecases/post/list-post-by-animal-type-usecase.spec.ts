import { PostRepository, ReportRepository, UserRepository } from '../../../hipet/repositories/interfaces'
import { ListPostByAnimalTypeResultStatusOptions, ListPostByAnimalTypeUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { ListPostByAnimalTypeUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, ReportRepositoryStub, UserRepositoryStub } from '../../mocks/repositories'
import { AnimalTypeOptions } from '../../../hipet/schemata/entities'

interface SutTypes {
  sut: ListPostByAnimalTypeUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepository
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new ListPostByAnimalTypeUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub, reportRepository: reportRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub,
    reportRepositoryStub
  }
}

const makePostRequest = {
  type: AnimalTypeOptions.dog
}

describe('Post - Use Case', () => {
  describe('List Post By Animal Type', () => {
    test('Should return SUCCESS status and the correct data post list', async () => {
      const { sut } = makeSut()
      const createPostResult = await sut.list(makePostRequest)

      expect(createPostResult.status).toEqual(ListPostByAnimalTypeResultStatusOptions.success)
      expect(createPostResult.posts.length).toEqual(1)
    })
  })
})
