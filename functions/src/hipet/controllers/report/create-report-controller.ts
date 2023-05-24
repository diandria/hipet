import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreateReportUseCaseInterface, CreateReportResultStatusOptions } from '../../usecases/interfaces'

export class CreateReportController implements HttpController {
  constructor (
    private readonly userUseCases: CreateReportUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredFields = ['post_id', 'reason']
      for (const field of requiredFields) {
        if (!requestData[field]) return badRequest(new MissingParamError(field))
      }

      const result = await this.userUseCases.create(requestData)

      if (result.status === CreateReportResultStatusOptions.post_not_found) {
        return notFound(new ContentNotFoundError('Post', requestData.post_id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
