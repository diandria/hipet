import { HttpRequest } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError, ServerError } from '../../../../config/controllers/errors'
import { serverError, success, notFound, badRequest } from '../../../../config/controllers/helpers/http-helpers'
import { CreateReportController } from '../../../hipet/controllers'
import { ReasonOptions } from '../../../hipet/schemata/entities'
import { CreateReportResultStatusOptions, CreateReportUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { mockReport } from '../../mocks/schemata/entities'
import { makeCreateReportUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: CreateReportController
  createReportUseCaseStub: CreateReportUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createReportUseCaseStub = makeCreateReportUseCase()
  const sut = new CreateReportController(createReportUseCaseStub)
  return {
    sut,
    createReportUseCaseStub
  }
}

const mockBody = {
  post_id: '00000000-0000-0000-0000-000000000000',
  reason: ReasonOptions.other,
  description: 'any_description'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create Report Controller', () => {
  test('Should return 500 if CreateReportUseCase throws', async () => {
    const { sut, createReportUseCaseStub } = makeSut()
    jest.spyOn(createReportUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if user doesnt exist', async () => {
    const { sut, createReportUseCaseStub } = makeSut()
    jest.spyOn(createReportUseCaseStub, 'create').mockImplementationOnce(async () =>
      Promise.resolve({
        status: CreateReportResultStatusOptions.post_not_found
      })
    )
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(notFound(new ContentNotFoundError('Post', mockBody.post_id)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('post_id')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      report: mockReport()
    }))
  })
})
