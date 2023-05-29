import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { serverError, success, notFound } from '../../../../config/controllers/helpers/http-helpers'
import { DeleteReportController } from '../../../hipet/controllers'
import { DeleteReportResultStatusOptions, DeleteReportUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { makeDeleteReportUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: DeleteReportController
  deleteReportUseCaseStub: DeleteReportUseCaseInterface
}

const makeSut = (): SutTypes => {
  const deleteReportUseCaseStub = makeDeleteReportUseCase()
  const sut = new DeleteReportController(deleteReportUseCaseStub)
  return {
    sut,
    deleteReportUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (params: any): HttpRequest => ({ params })

describe('Delete Report Controller', () => {
  test('Should return 500 if DeleteReportUseCase throws', async () => {
    const { sut, deleteReportUseCaseStub } = makeSut()
    jest.spyOn(deleteReportUseCaseStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if post doesnt exist', async () => {
    const { sut, deleteReportUseCaseStub } = makeSut()
    jest.spyOn(deleteReportUseCaseStub, 'delete').mockImplementationOnce(async () =>
      Promise.resolve({
        status: DeleteReportResultStatusOptions.report_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('Report', mockParams.id)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
