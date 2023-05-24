import { HttpController, HttpResponse } from '../../../../config/controllers/contracts'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ApresentationUseCasesInterface } from '../../usecases/interfaces'

export class VersionController implements HttpController {
  constructor (
    private readonly apresentationUseCases: ApresentationUseCasesInterface
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const result = this.apresentationUseCases.getVersion()
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
