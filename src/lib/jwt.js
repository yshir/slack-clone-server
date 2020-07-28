const jwt = require('jsonwebtoken')
const config = require('../config')

const { secret, expiresIn } = config.jwt

const createToken = async (params = {}) => {
  return await jwt.sign(params, secret, { expiresIn })
}

const decodeToken = token => {
  try {
    if (!token) {
      return null
    }
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
}

module.exports = {
  createToken,
  decodeToken,
}
