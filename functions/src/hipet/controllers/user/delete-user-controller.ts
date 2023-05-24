import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { DeleteUserUseCaseInterface, DeleteUserResultStatusOptions } from '../../usecases/interfaces'

export class DeleteUserController implements HttpController {
  constructor (
    private readonly userUseCases: DeleteUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestParams = httpRequest.params

      const result = await this.userUseCases.delete({ id: requestParams.id })

      if (result.status === DeleteUserResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestParams.id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
