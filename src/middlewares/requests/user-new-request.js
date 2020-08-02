const _ = require('lodash')
const Ajv = require('ajv')
const ValidationError = require('../../lib/errors/validation-error')

module.exports = (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        minLength: 1,
      },
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 255,
      },
    },
    required: ['token', 'username', 'password'],
  }
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)

  const isValid = validate(req.body)
  if (!isValid) {
    throw new ValidationError('Invalid request', validate.errors)
  }

  req.body = _.pick(req.body, _.keys(schema.properties))

  next()
}
