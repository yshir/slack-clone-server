const express = require('express')
const router = express.Router()

const models = require('../../models')
const serialize = require('../../presenters/workspaces')
const workspaceRequest = require('../../middlewares/requests/workspace-request')

router.get('/', async (req, res, next) => {
  try {
    const workspaces = await models.Workspace.findAll()
    res.json({ workspaces: serialize(workspaces) })
  } catch (err) {
    next(err)
  }
})

router.post('/', workspaceRequest, async (req, res, next) => {
  try {
    let workspace = null
    let user = null
    await models.sequelize.transaction(async t => {
      workspace = await models.Workspace.create(
        {
          name: req.body.workspace_name,
        },
        { transaction: t },
      )
      user = await models.User.create(
        {
          workspace_id: workspace.id,
          username: req.body.username,
          displayname: req.body.username,
          password: req.body.password,
        },
        { transaction: t },
      )
    })
    res.json({ success: true, user_id: user.id, workspace_id: workspace.id })
  } catch (err) {
    next(err)
  }
})

module.exports = router
