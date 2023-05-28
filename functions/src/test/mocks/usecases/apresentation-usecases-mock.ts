import { ApresentationUseCasesInterface } from '../../../hipet/usecases/interfaces'

export const makeGetVersionUseCase = (): ApresentationUseCasesInterface => {
  class GetVersionUseCaseStub implements ApresentationUseCasesInterface {
    getVersion (): any {
      return {
        status: 'SUCCESS',
        version: '0.0.0',
        description: 'any_description'
      }
    }
  }
  return new GetVersionUseCaseStub()
}
