const express = require('express')
const router = express.Router()

const models = require('../../models')
const authHelper = require('../../helpers/auth')
const UnauthorizedError = require('../../lib/errors/unauthorized-error')

router.post('/', async (req, res, next) => {
  try {
    const { username, password, workspace_name } = req.body
    const user = await models.User.findOne({
      where: { username },
      include: [
        {
          model: models.Workspace,
          as: 'workspace',
          where: {
            name: workspace_name,
          },
        },
      ],
    })
    if (!user || !user.isValidPassword(password)) {
      return next(new UnauthorizedError('Invalid params'))
    }
    const channels = await user.getChannels()

    const token = await authHelper.createTokenByUserId(user.id)
    res.json({ token, default_channel: channels[0] })
  } catch (err) {
    next(err)
  }
})

module.exports = router
