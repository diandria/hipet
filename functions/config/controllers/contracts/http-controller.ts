export type HttpRequest = {
  query?: any
  params?: any
  headers?: any
  body?: any
}

export type HttpResponse = {
  status: number
  headers?: any
  body?: any
}

export abstract class HttpController {
  abstract handle (request: HttpRequest): Promise<HttpResponse>
}
