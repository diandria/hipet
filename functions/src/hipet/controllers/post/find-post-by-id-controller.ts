import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindPostByIdUseCaseInterface, FindPostByIdResultStatusOptions } from '../../usecases/interfaces'

export class FindPostByIdController implements HttpController {
  constructor (
    private readonly postUseCases: FindPostByIdUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.params

      const result = await this.postUseCases.find(requestData)

      if (result.status === FindPostByIdResultStatusOptions.post_not_found) {
        return notFound(new ContentNotFoundError('Post', requestData.id))
      }

      if (result.status === FindPostByIdResultStatusOptions.repository_error) {
        return serverError(new ServerError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
