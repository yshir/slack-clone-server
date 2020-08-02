const uuid = require('uuid')
const jwt = require('../lib/jwt')

const userInvitation = {}

userInvitation.createToken = async workspaceId => {
  const token = await jwt.createToken(
    {
      token_type: 'user_invitation',
      user_id: uuid.v4(),
      workspace_id: workspaceId,
    },
    { expiresIn: '30m' },
  )
  return token
}

userInvitation.decodeToken = token => {
  const decoded = jwt.decodeToken(token)
  if (!decoded || decoded.token_type !== 'user_invitation') {
    throw new Error('invalid token')
  }
  return decoded
}

module.exports = userInvitation
