import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError, NotAcceptParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreateUserUseCaseInterface, CreateUserResultStatusOptions } from '../../usecases/interfaces'

export class CreateUserController implements HttpController {
  constructor (
    private readonly userUseCases: CreateUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredCommonFields = ['type', 'name', 'email', 'nickname', 'phone_number', 'password']
      for (const field of requiredCommonFields) {
        if (!requestData[field]) return badRequest(new MissingParamError(field))
      }

      if (requestData.type === 'PERSON') {
        const requiredPersonFields = ['document']
        for (const field of requiredPersonFields) {
          if (!requestData[field]) return badRequest(new MissingParamError(field))
        }
        const notAcceptedPersonFields = ['donation_link']
        for (const field of notAcceptedPersonFields) {
          if (requestData[field]) return badRequest(new NotAcceptParamError(field))
        }
      } else if (requestData.type === 'ONG') {
        const notAcceptedOngFields = ['document']
        for (const field of notAcceptedOngFields) {
          if (requestData[field]) return badRequest(new NotAcceptParamError(field))
        }
      } else {
        return badRequest(new WrongParamError(requestData.type))
      }

      const result = await this.userUseCases.create(requestData)

      if (result.status === CreateUserResultStatusOptions.unique_key_field) {
        return badRequest(new WrongParamError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
