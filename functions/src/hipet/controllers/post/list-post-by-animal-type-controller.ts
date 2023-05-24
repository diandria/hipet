import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { validate_animal_type } from '../../logic'
import { ListPostByAnimalTypeUseCaseInterface } from '../../usecases/interfaces'

export class ListPostByAnimalTypeController implements HttpController {
  constructor (
    private readonly postUseCases: ListPostByAnimalTypeUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.query

      const requiredFields = ['type']
      for (const field of requiredFields) {
        if (!requestData[field]) return badRequest(new MissingParamError(field))
      }

      if (!validate_animal_type(requestData.type)) return badRequest(new WrongParamError(requestData.type))

      const result = await this.postUseCases.list({ type: requestData.type, limit: Number(requestData.limit) })

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
