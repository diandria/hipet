import { HttpRequest } from '../../../../config/controllers/contracts'
import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindReportByIdController } from '../../../hipet/controllers'
import { FindReportByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockReport } from '../../mocks/schemata/entities'
import { makeFindReportByIdUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: FindReportByIdController
  findReportByIdUseCaseStub: FindReportByIdUseCaseInterface
}

const makeSut = (): SutTypes => {
  const findReportByIdUseCaseStub = makeFindReportByIdUseCase()
  const sut = new FindReportByIdController(findReportByIdUseCaseStub)
  return {
    sut,
    findReportByIdUseCaseStub
  }
}

const mockParams = {
  id: '00000000-0000-0000-0000-000000000000'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Find Report By Id Controller', () => {
  test('Should return 500 if FindReportByIdUseCase throws', async () => {
    const { sut, findReportByIdUseCaseStub } = makeSut()
    jest.spyOn(findReportByIdUseCaseStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      report: mockReport()
    }))
  })
})
