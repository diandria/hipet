import { Request, Response } from 'express'
import { HttpController, HttpRequest } from '../../controllers/contracts'

export const adaptRoute = (controller: HttpController) => async (req: Request, res: Response): Promise<Response> => {
  const request: HttpRequest = {
    headers: req.headers,
    query: req.query,
    params: req.params,
    body: req.body
  }

  const response = await controller.handle(request)

  if (response.status >= 200 && response.status < 300) {
    return res.status(response.status).json(response.body)
  } else {
    return res.status(response.status).json({
      error: {
        message: response.body?.message,
        name: response.body?.name
      }
    })
  }
}
