import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ListAllPostUseCaseInterface } from '../../usecases/interfaces'

export class ListAllPostController implements HttpController {
  constructor (
    private readonly postUseCases: ListAllPostUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.query

      const result = await this.postUseCases.list({ limit: Number(requestData.limit) })

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
