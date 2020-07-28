const _ = require('lodash')
const jwt = require('../lib/jwt')
const models = require('../models')

const auth = {}

auth.createTokenByUserId = async userId => {
  const user = await models.User.findByPk(userId)
  if (!user) {
    throw new Error('invalid user id')
  }
  const token = await jwt.createToken({ user_id: user.id })
  return token
}

auth.getUserByToken = async token => {
  const userId = _.get(jwt.decodeToken(token), 'user_id')
  const user = await models.User.findByPk(userId)
  if (!user) {
    throw new Error('invalid token')
  }
  return user
}

module.exports = auth
