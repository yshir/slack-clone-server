const _ = require('lodash')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const workspace = req.user.workspace
    res.json({ workspace: { name: workspace.name } })
  } catch (err) {
    next(err)
  }
})

module.exports = router
