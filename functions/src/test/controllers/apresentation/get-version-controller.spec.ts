import { ServerError } from '../../../../config/controllers/errors'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { VersionController } from '../../../hipet/controllers'
import { ApresentationUseCasesInterface } from '../../../hipet/usecases/interfaces'
import { makeGetVersionUseCase } from '../../mocks/usecases'

interface SutTypes {
  sut: VersionController
  getVersionUseCaseStub: ApresentationUseCasesInterface
}

const makeSut = (): SutTypes => {
  const getVersionUseCaseStub = makeGetVersionUseCase()
  const sut = new VersionController(getVersionUseCaseStub)
  return {
    sut,
    getVersionUseCaseStub
  }
}

describe('Ger version - Controller', () => {
  test('Should return 500 if getVersionUseCase throws', async () => {
    const { sut, getVersionUseCaseStub } = makeSut()
    jest.spyOn(getVersionUseCaseStub, 'getVersion').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      version: '0.0.0',
      description: 'any_description'
    }))
  })
})
