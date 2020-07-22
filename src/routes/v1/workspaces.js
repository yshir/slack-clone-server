const express = require('express')
const router = express.Router()

const models = require('../../models')
const serialize = require('../../presenters/workspaces')

router.get('/', async (req, res, next) => {
  try {
    const workspaces = await models.Workspace.findAll()
    res.json({ data: serialize(workspaces) })
  } catch (err) {
    next(err)
  }
})

module.exports = router
