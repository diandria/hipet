import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError, ServerError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { DeleteReportUseCaseInterface, DeleteReportResultStatusOptions } from '../../usecases/interfaces'

export class DeleteReportController implements HttpController {
  constructor (
    private readonly reportUseCases: DeleteReportUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestParams = httpRequest.params

      const result = await this.reportUseCases.delete({ id: requestParams.id })

      if (result.status === DeleteReportResultStatusOptions.report_not_found) {
        return notFound(new ContentNotFoundError('Report', requestParams.id))
      }

      if (result.status === DeleteReportResultStatusOptions.repository_error) {
        return serverError(new ServerError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
