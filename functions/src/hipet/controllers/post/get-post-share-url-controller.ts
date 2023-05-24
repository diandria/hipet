import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { GetPostShareUrlUseCaseInterface, GetPostShareUrlResultStatusOptions } from '../../usecases/interfaces'

export class GetPostShareUrlController implements HttpController {
  constructor (
    private readonly postUseCases: GetPostShareUrlUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.params

      const result = await this.postUseCases.find(requestData)

      if (result.status === GetPostShareUrlResultStatusOptions.post_not_found) {
        return notFound(new ContentNotFoundError('Post', requestData.id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
