import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { validate_animal_type, validate_color, validate_post_state, validate_size, validate_sex } from '../../logic'
import { CreatePostUseCaseInterface, CreatePostResultStatusOptions } from '../../usecases/interfaces'

export class CreatePostController implements HttpController {
  constructor (
    private readonly userUseCases: CreatePostUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      // MISSING REQUIRED FIELD
      const requiredFields = ['customer_id', 'animal', 'state', 'description']
      for (const field of requiredFields) {
        if (!requestData[field]) return badRequest(new MissingParamError(field))
      }
      const requiredAnimalFields = ['name', 'color', 'size', 'health_info', 'type']
      for (const field of requiredAnimalFields) {
        if (!requestData.animal[field]) return badRequest(new MissingParamError(field))
      }
      const requiredAnimalHealthInfoFields = ['vaccinated', 'castreated', 'special_care']
      for (const field of requiredAnimalHealthInfoFields) {
        if (requestData.animal.health_info[field] === undefined) return badRequest(new MissingParamError(field))
      }
      // WRONG FIELD
      if (!validate_post_state(requestData.state)) return badRequest(new WrongParamError(requestData.state))
      if (!validate_animal_type(requestData.animal.type)) return badRequest(new WrongParamError(requestData.animal.type))
      if (!validate_color(requestData.animal.color)) return badRequest(new WrongParamError(requestData.animal.color))
      if (!validate_size(requestData.animal.size)) return badRequest(new WrongParamError(requestData.animal.size))
      if (!validate_sex(requestData.animal.sex)) return badRequest(new WrongParamError(requestData.animal.sex))

      if (requestData.animal.age) requestData.animal.age = Number(requestData.animal.age)

      const result = await this.userUseCases.create(requestData)

      if (result.status === CreatePostResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestData.customer_id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
