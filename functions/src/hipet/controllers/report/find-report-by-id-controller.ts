import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindReportByIdUseCaseInterface, FindReportByIdResultStatusOptions } from '../../usecases/interfaces'

export class FindReportByIdController implements HttpController {
  constructor (
    private readonly reportUseCases: FindReportByIdUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.params

      const result = await this.reportUseCases.find(requestData)

      if (result.status === FindReportByIdResultStatusOptions.report_not_found) {
        return notFound(new ContentNotFoundError('Report', requestData.id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
