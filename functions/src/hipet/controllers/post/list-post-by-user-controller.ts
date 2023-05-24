import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ListPostByUserResultStatusOptions, ListPostByUserUseCaseInterface } from '../../usecases/interfaces'

export class ListPostByUserController implements HttpController {
  constructor (
    private readonly postUseCases: ListPostByUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestParams = httpRequest.params
      const requestData = httpRequest.query

      const requiredFields = ['customer_id']
      for (const field of requiredFields) {
        if (!requestParams[field]) return badRequest(new MissingParamError(field))
      }

      const result = await this.postUseCases.list({ customer_id: requestParams.customer_id, limit: Number(requestData.limit) })

      if (result.status === ListPostByUserResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestParams.customer_id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
