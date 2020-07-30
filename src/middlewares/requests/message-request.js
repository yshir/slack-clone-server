const _ = require('lodash')
const Ajv = require('ajv')
const ValidationError = require('../../lib/errors/validation-error')

module.exports = (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      channel_id: {
        type: 'string',
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$',
      },
      text: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['channel_id', 'text'],
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
