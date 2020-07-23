const cors = require('cors')
const config = require('../config')

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined) {
      // same origin
      callback(null, true)
    } else if (config.cors.allowed.some(reg => reg.test(origin))) {
      // allowed origin
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS. origin: ${origin}`), false)
    }
  },
  credentials: true,
}

module.exports = cors(corsOptions)
