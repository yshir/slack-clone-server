const _ = require('lodash')
const Ajv = require('ajv')
const ValidationError = require('../../lib/errors/validation-error')

module.exports = (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      displayname: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      avatar_url: {
        type: 'string',
        format: 'uri',
        maxLength: 255,
      },
    },
  }
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)

  const isValid = validate(req.body)
  if (!isValid) {
    return next(new ValidationError('Invalid request', validate.errors))
  }

  req.body = _.pick(req.body, _.keys(schema.properties))

  next()
}
