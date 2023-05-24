import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError, NotAcceptParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { UpdateUserUseCaseInterface, UpdateUserResultStatusOptions } from '../../usecases/interfaces'

export class UpdateUserController implements HttpController {
  constructor (
    private readonly userUseCases: UpdateUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestBody = httpRequest.body
      const requestParams = httpRequest.params

      const notAcceptedCommonFields = ['document']
      for (const field of notAcceptedCommonFields) {
        if (requestBody[field]) return badRequest(new NotAcceptParamError(field))
      }

      const requiredCommonFields = ['type']
      for (const field of requiredCommonFields) {
        if (!requestBody[field]) return badRequest(new MissingParamError(field))
      }

      if (requestBody.type === 'PERSON') {
        const notAcceptedPersonFields = ['donation_link']
        for (const field of notAcceptedPersonFields) {
          if (requestBody[field]) return badRequest(new NotAcceptParamError(field))
        }
      }

      const result = await this.userUseCases.update({ id: requestParams.id, ...requestBody })

      if (result.status === UpdateUserResultStatusOptions.unique_key_field) {
        return badRequest(new WrongParamError(result.status))
      }

      if (result.status === UpdateUserResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestParams.id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
