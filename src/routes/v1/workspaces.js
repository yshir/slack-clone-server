const express = require('express')
const router = express.Router()

const authHelper = require('../../helpers/auth')
const models = require('../../models')
const WorkspaceForm = require('../../forms/workspace-form')
const workspaceNewRequest = require('../../middlewares/requests/workspace-new-request')

router.get('/', async (req, res, next) => {
  try {
    const workspaces = await models.Workspace.findAll()
    res.json({ workspaces: workspaces.map(w => ({ name: w.name })) })
  } catch (err) {
    next(err)
  }
})

router.post('/', workspaceNewRequest, async (req, res, next) => {
  try {
    const form = new WorkspaceForm(req.body)
    await form.save()
    const { user, channels } = form

    const token = await authHelper.createTokenByUserId(user.id)
    res.json({ token, default_channel: channels[0] })
  } catch (err) {
    next(err)
  }
})

module.exports = router
