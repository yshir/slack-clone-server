const express = require('express')
const fs = require('fs')
const path = require('path')

const NotFoundError = require('../../lib/errors/notfound-error')

const router = express.Router()

fs.readdirSync(__dirname, { withFileTypes: true }).forEach((dirent) => {
  if (!dirent.isFile()) {
    const dirname = dirent.name
    router.use(`/${dirname}`, require(`./${dirname}`))
  } else if (path.extname(dirent.name) === '.js' && dirent.name !== 'index.js') {
    const jsname = path.basename(dirent.name, '.js')
    router.use(`/${jsname}`, require(`./${jsname}`))
  }
})

router.use((req, res) => {
  throw new NotFoundError(`Some of the aliases you requested do not exist: ${req.path}`)
})

module.exports = router
