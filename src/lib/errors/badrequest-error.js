const ApplicationError = require('./application-error')

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'Bad Request', 400)
  }
}

module.exports = BadRequestError
