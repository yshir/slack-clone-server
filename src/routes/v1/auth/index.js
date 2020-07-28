const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.use(require('../../../middlewares/auth'))

router.use(async (req, res, next) => {
  req.user.workspace = await req.user.getWorkspace()
  req.user.channels = await req.user.getChannels()
  next()
})

fs.readdirSync(__dirname).forEach(filename => {
  if (path.extname(filename) === '.js' && filename !== 'index.js') {
    const jsname = path.basename(filename, '.js')
    router.use(`/${jsname}`, require(`./${jsname}`))
  }
})

module.exports = router
