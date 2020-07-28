const authHelper = require('../helpers/auth')
const UnauthorizedError = require('../lib/errors/unauthorized-error')

module.exports = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    return next(new UnauthorizedError('token required'))
  }

  const [type, token] = header.split(' ')
  if (type !== 'Bearer') {
    return next(new UnauthorizedError('token required'))
  }

  req.user = await authHelper.getUserByToken(token)
  next()
}
