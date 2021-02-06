class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  const message = err.message
  const { statusCode } = mappingInstanceErrors[err.constructor.name](err) || mappingInstanceErrors.default(err)

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

const mapErrorHandleResponse = (error) => {
  return {
    statusCode: error.statusCode
  }
}

const mapUnauthorizedErrorResponse = (error) => {
  return {
    statusCode: error.status
  }
}

const mapDefaultErrorResponse = () => {
  return {
    statusCode: 500
  }
}

const mappingInstanceErrors = {
  ErrorHandler: mapErrorHandleResponse,
  UnauthorizedError: mapUnauthorizedErrorResponse,
  DefaultError: mapDefaultErrorResponse,
  DatabaseError: mapDefaultErrorResponse
}

module.exports = {
  ErrorHandler,
  handleError
}
