import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { FindUserByNicknameUseCaseInterface, FindUserByNicknameResultStatusOptions } from '../../usecases/interfaces'

export class FindUserByNicknameController implements HttpController {
  constructor (
    private readonly userUseCases: FindUserByNicknameUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.params

      const result = await this.userUseCases.find(requestData)

      if (result.status === FindUserByNicknameResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestData.nickname))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
