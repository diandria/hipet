export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}

export class AccessDeniedError extends Error {
  constructor (status: string) {
    super('Access denied')
    this.name = `${status}`
  }
}

export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export class WrongParamError extends Error {
  constructor (error: string) {
    super(`Wrong param: ${error}`)
    this.name = 'WrongParamError'
  }
}

export class NotAcceptParamError extends Error {
  constructor (field: string) {
    super(`This field is not accepted: ${field}`)
    this.name = 'NotAcceptParamError'
  }
}

export class ContentNotFoundError extends Error {
  constructor (content: string, id: string) {
    super(`${content} not Found for: ${id}`)
    this.name = 'ContentNotFoundError'
  }
}
