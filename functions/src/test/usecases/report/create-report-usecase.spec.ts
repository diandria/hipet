import { PostRepository, ReportRepository } from '../../../hipet/repositories/interfaces'
import { UuidService } from '../../../hipet/services/interfaces'
import { CreateReportResultStatusOptions, CreateReportUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { ReasonOptions, Report } from '../../../hipet/schemata/entities'
import { CreateReportUseCase } from '../../../hipet/usecases/implementations'
import { PostRepositoryStub, ReportRepositoryStub } from '../../mocks/repositories'
import { UuidServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: CreateReportUseCaseInterface
  postRepositoryStub: PostRepository
  reportRepositoryStub: ReportRepository
  uuidServiceStub: UuidService
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const reportRepositoryStub = new ReportRepositoryStub()
  const uuidServiceStub = new UuidServiceStub()

  const sut = new CreateReportUseCase({ postRepository: postRepositoryStub, reportRepository: reportRepositoryStub, uuidService: uuidServiceStub })
  return {
    sut,
    postRepositoryStub,
    reportRepositoryStub,
    uuidServiceStub
  }
}

const makeReportRequest = {
  post_id: '00000000-0000-0000-0000-000000000000',
  reason: ReasonOptions.other,
  description: 'any_description'
}

describe('Report - Use Case', () => {
  describe('Create Report', () => {
    test('Should return POST_NOT_FOUND status if user id doesnt exists', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'findPostBy').mockImplementationOnce(null) // email

      const createReportResult = await sut.create(makeReportRequest)
      expect(createReportResult).toEqual({
        status: CreateReportResultStatusOptions.post_not_found
      })
    })

    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, reportRepositoryStub } = makeSut()

      jest.spyOn(reportRepositoryStub, 'add').mockImplementationOnce(async () => null) // throw

      const createReportResult = await sut.create(makeReportRequest)
      expect(createReportResult).toEqual({
        status: CreateReportResultStatusOptions.repository_error
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut } = makeSut()
      const createReportResult = await sut.create(makeReportRequest)

      expect(createReportResult.status).toEqual(CreateReportResultStatusOptions.success)
      expect(createReportResult.report).toBeInstanceOf(Report)
    })
  })
})
