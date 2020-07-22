const http = require('http')

const app = require('./app')
const config = require('./config')

const { env, port } = config.app
if (env !== 'test') {
  const server = http.createServer(app)
  server.listen(port, () => {
    console.log(`> 🚀 server running: http://localhost:${port}`)
  })
}
