import { ReportRepository } from '../../../hipet/repositories/interfaces'
import { FindReportByIdResultStatusOptions, FindReportByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { FindReportByIdUseCase } from '../../../hipet/usecases/implementations'
import { ReportRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: FindReportByIdUseCaseInterface
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new FindReportByIdUseCase({ reportRepository: reportRepositoryStub })
  return {
    sut,
    reportRepositoryStub
  }
}

const makeReportRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('Report - Use Case', () => {
  describe('Find Report By ID', () => {
    test('Should return REPORT_NOT_FOUND status if report doesnt exist', async () => {
      const { sut, reportRepositoryStub } = makeSut()
      jest.spyOn(reportRepositoryStub, 'findReportBy').mockImplementationOnce(null)

      const FindReportByIdResult = await sut.find(makeReportRequest)
      expect(FindReportByIdResult).toEqual({
        status: FindReportByIdResultStatusOptions.report_not_found
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut } = makeSut()
      const FindReportByIdResult = await sut.find(makeReportRequest)

      expect(FindReportByIdResult.status).toEqual(FindReportByIdResultStatusOptions.success)
    })
  })
})
