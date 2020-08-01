const _ = require('lodash')
const express = require('express')
const router = express.Router()

const models = require('../../../models')
const workspaceUpdateRequest = require('../../../middlewares/requests/workspace-update-request')

router.get('/', async (req, res, next) => {
  try {
    const workspace = req.user.workspace
    res.json({ workspace: { name: workspace.name } })
  } catch (err) {
    next(err)
  }
})

router.put('/', workspaceUpdateRequest, async (req, res, next) => {
  try {
    const workspace = req.user.workspace
    workspace.name = req.body.name
    await workspace.save()
    res.json({ workspace })
  } catch (err) {
    next(err)
  }
})

module.exports = router
