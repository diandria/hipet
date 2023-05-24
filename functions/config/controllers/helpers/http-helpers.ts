import { HttpResponse } from '../contracts'
import { ServerError } from '../errors'

export const unprocessableEntity = (error: Error): HttpResponse => ({
  status: 422,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  status: 404,
  body: error
})

export const unauthorized = (error: Error): HttpResponse => ({
  status: 401,
  body: error
})

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})

export const success = (data: any): HttpResponse => ({
  status: 200,
  body: data
})

export const serverError = (error: any): HttpResponse => ({
  status: 500,
  body: new ServerError(error.stack as string)
})

export const noContent = (): HttpResponse => ({
  status: 204,
  body: null
})
