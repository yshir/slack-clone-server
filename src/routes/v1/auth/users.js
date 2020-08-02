const express = require('express')
const router = express.Router()

const userInvitationHelper = require('../../../helpers/user-invitation')

router.post('/', async (req, res, next) => {
  try {
    const token = await userInvitationHelper.createToken(req.user.workspace.id)
    res.json({ token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
