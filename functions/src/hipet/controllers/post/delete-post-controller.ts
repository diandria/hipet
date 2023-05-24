import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { DeletePostUseCaseInterface, DeletePostResultStatusOptions } from '../../usecases/interfaces'

export class DeletePostController implements HttpController {
  constructor (
    private readonly postUseCases: DeletePostUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestParams = httpRequest.params

      const result = await this.postUseCases.delete({ id: requestParams.id })

      if (result.status === DeletePostResultStatusOptions.post_not_found) {
        return notFound(new ContentNotFoundError('Post', requestParams.id))
      }

      if (result.status === DeletePostResultStatusOptions.repository_error) {
        return serverError(new ServerError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
