const ApplicationError = require('./application-error')

class ValidationError extends ApplicationError {
  constructor(message, details) {
    super(message || 'Validation error', 400)
    this.details = details || []
  }
}

module.exports = ValidationError
