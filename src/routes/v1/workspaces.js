const express = require('express')
const router = express.Router()

const authHelper = require('../../helpers/auth')
const models = require('../../models')
const WorkspaceForm = require('../../forms/workspace-form')
const workspaceRequest = require('../../middlewares/requests/workspace-request')

router.get('/', async (req, res, next) => {
  try {
    const workspaces = await models.Workspace.findAll()
    res.json({ workspaces: workspaces.map(w => ({ name: w.name })) })
  } catch (err) {
    next(err)
  }
})

router.post('/', workspaceRequest, async (req, res, next) => {
  try {
    const form = new WorkspaceForm(req.body)
    await form.save()

    const token = await authHelper.createTokenByUserId(form.user.id)
    res.json({ token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
