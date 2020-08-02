const express = require('express')
const router = express.Router()

const models = require('../../models')
const authHelper = require('../../helpers/auth')
const userInvitationHelper = require('../../helpers/user-invitation')
const BadRequestError = require('../../lib/errors/badrequest-error')
const UserForm = require('../../forms/user-form')
const userNewRequest = require('../../middlewares/requests/user-new-request')

router.post('/', userNewRequest, async (req, res, next) => {
  try {
    const { token, username, password } = req.body
    const { workspace_id, user_id } = userInvitationHelper.decodeToken(token)

    const user = await models.User.findByPk(user_id)
    if (user) {
      return next(new BadRequestError('Token already used'))
    }

    const form = new UserForm({
      id: user_id,
      workspace_id,
      username,
      displayname: username,
      password,
    })
    await form.save()

    const authToken = await authHelper.createTokenByUserId(form.user.id)
    res.json({ token: authToken, default_channel: form.channels[0] })
  } catch (err) {
    console.log('################')
    console.log(err)
    console.log('################')
    next(err)
  }
})

module.exports = router
