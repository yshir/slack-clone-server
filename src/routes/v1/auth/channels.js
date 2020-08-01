const _ = require('lodash')
const express = require('express')
const router = express.Router()

const models = require('../../../models')
const channelRequest = require('../../../middlewares/requests/channel-request')

router.get('/', async (req, res, next) => {
  try {
    const channels = await models.Channel.findAll({
      where: { workspace_id: req.user.workspace.id },
      include: [{ model: models.User, as: 'users' }],
    })

    res.json({
      channels: channels.map(channel => ({
        id: channel.id,
        name: channel.name,
        is_joined: _.includes(
          channel.users.map(user => user.id),
          req.user.id,
        ),
        users: channel.users.map(user => _.pick(user, ['username', 'displayname', 'avatar_url'])),
      })),
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', channelRequest, async (req, res, next) => {
  try {
    const channel = await models.Channel.create({
      workspace_id: req.user.workspace.id,
      name: req.body.name,
    })
    await channel.setUsers([req.user.id])

    res.json({ channel })
  } catch (err) {
    next(err)
  }
})

module.exports = router
