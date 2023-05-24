import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { AccessDeniedError, ContentNotFoundError, MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, notFound, serverError, success, unauthorized } from '../../../../config/controllers/helpers/http-helpers'
import { LoginUserUseCaseInterface, LoginUserResultStatusOptions } from '../../usecases/interfaces'

export class LoginUserController implements HttpController {
  constructor (
    private readonly userUseCases: LoginUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestBody = httpRequest.body

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!requestBody[field]) return badRequest(new MissingParamError(field))
      }

      const result = await this.userUseCases.authenticate(requestBody)

      if (result.status === LoginUserResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestBody.email))
      }

      if (result.status === LoginUserResultStatusOptions.wrong_password) {
        return unauthorized(new AccessDeniedError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
