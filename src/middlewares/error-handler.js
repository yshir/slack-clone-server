const config = require('../config')

module.exports = (err, req, res, next) => {
  if (config.app.env === 'development') {
    console.error(err)
  }

  const ret = {
    name: err.name,
    status: err.status || 500,
  }

  if (config.app.env === 'production') {
    const is5xxError = String(ret.status).startsWith('5')
    ret.message = is5xxError ? 'Internal server error occured' : err.message
  } else {
    ret.message = err.message
    ret.stack = err.stack
  }

  if (err.name === 'ValidationError' && err.details) {
    ret.details = err.details
  }

  return res.status(ret.status).json(ret)
}
