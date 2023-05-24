import { ApresentationUseCasesInterface } from '../../interfaces'

export class ApresentationUseCases implements ApresentationUseCasesInterface {
  getVersion (): any {
    return {
      status: 'SUCCESS',
      version: '2.0.0',
      description: 'API para o sistema HIPET'
    }
  }
}
