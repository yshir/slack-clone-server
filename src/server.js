const http = require('http')
const socketIo = require('socket.io')

const app = require('./app')
const config = require('./config')

const server = http.createServer(app)

const io = socketIo(server)
app.io = io

const { env, port } = config.app
if (env !== 'test') {
  io.on('connection', socket => {
    console.log('New client connected')
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })

  server.listen(port, () => {
    console.log(`> 🚀 server running: http://localhost:${port}`)
  })
}

module.exports = server
