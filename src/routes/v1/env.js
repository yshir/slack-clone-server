const express = require('express')
const router = express.Router()

const config = require('../../config')

router.get('/', (req, res) => {
  const { env } = config.app
  res.json({ env })
})

module.exports = router
