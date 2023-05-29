import { ReportRepository } from '../../../hipet/repositories/interfaces'
import { DeleteReportResultStatusOptions, DeleteReportUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { DeleteReportUseCase } from '../../../hipet/usecases/implementations'
import { ReportRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: DeleteReportUseCaseInterface
  reportRepositoryStub: ReportRepository
}

const makeSut = (): SutTypes => {
  const reportRepositoryStub = new ReportRepositoryStub()

  const sut = new DeleteReportUseCase({ reportRepository: reportRepositoryStub })
  return {
    sut,
    reportRepositoryStub
  }
}

const makeReportRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('Report - Use Case', () => {
  describe('Delete Report', () => {
    test('Should return REPORT_NOT_FOUND status if report doesnt exist', async () => {
      const { sut, reportRepositoryStub } = makeSut()
      jest.spyOn(reportRepositoryStub, 'findReportBy').mockImplementationOnce(null)

      const DeleteReportResult = await sut.delete(makeReportRequest)
      expect(DeleteReportResult).toEqual({
        status: DeleteReportResultStatusOptions.report_not_found
      })
    })

    test('Should return REPORT_REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, reportRepositoryStub } = makeSut()
      jest.spyOn(reportRepositoryStub, 'delete').mockImplementationOnce(async () => null) // throw

      const deleteReportResult = await sut.delete(makeReportRequest)
      expect(deleteReportResult).toEqual({
        status: DeleteReportResultStatusOptions.repository_error
      })
    })

    test('Should return SUCCESS status', async () => {
      const { sut } = makeSut()
      const DeleteReportResult = await sut.delete(makeReportRequest)

      expect(DeleteReportResult.status).toEqual(DeleteReportResultStatusOptions.success)
    })
  })
})
