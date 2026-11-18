export function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    message: 'Route not found.',
    data: null,
  })
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }

  let statusCode = 500
  let message = 'An unexpected error occurred.'

  if (error.type === 'entity.too.large') {
    statusCode = 413
    message = 'Request body is too large.'
  } else if (error.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Request body must contain valid JSON.'
  } else if (error.name === 'ValidationError') {
    statusCode = 400
    message = 'The submitted data is invalid.'
  } else if (error.name === 'CastError') {
    statusCode = 400
    message = 'The request contains an invalid identifier.'
  } else {
    console.error('Request failed:', error.name || 'Unknown error')
  }

  return response.status(statusCode).json({
    success: false,
    message,
    data: null,
  })
}
