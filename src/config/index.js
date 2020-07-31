require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./${env}`)

const config = {
  app: {
    env: env,
    port: process.env.PORT || 3001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  socket: {
    events: {
      update_message: 'update-message',
    },
  },
  ...envConfig,
}

module.exports = config
