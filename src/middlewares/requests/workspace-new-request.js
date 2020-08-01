const _ = require('lodash')
const Ajv = require('ajv')
const ValidationError = require('../../lib/errors/validation-error')

const Types = {
  string: 'string',
  number: 'number',
}

module.exports = (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      workspace_name: {
        type: Types.string,
        minLength: 1,
        maxLength: 30,
      },
      username: {
        type: Types.string,
        minLength: 1,
        maxLength: 30,
      },
      password: {
        type: Types.string,
        minLength: 6,
        maxLength: 255,
      },
    },
    required: ['workspace_name', 'username', 'password'],
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
