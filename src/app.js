const express = require('express')
const useragent = require('express-useragent')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('./middlewares/cors')
const errorHandler = require('./middlewares/error-handler')

const app = express()
app.use(logger('dev'))
app.use(express.json({ limit: '50mb', extended: true })) // POSTするデータサイズを50MBまで許可
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(useragent.express())
app.use(cookieParser())

app.use(cors)
app.use('/v1', require('./routes/v1'))
app.use(errorHandler)

module.exports = app
