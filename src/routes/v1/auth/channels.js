const _ = require('lodash')
const express = require('express')
const router = express.Router()

const models = require('../../../models')

router.get('/', async (req, res, next) => {
  try {
    const workspaceChannels = await models.Channel.findAll({
      where: { workspace_id: req.user.workspace.id },
    })
    const joinedChannelIds = req.user.channels.map(item => item.id)

    res.json({
      channels: workspaceChannels.map(c => ({
        id: c.id,
        name: c.name,
        is_joined: _.includes(joinedChannelIds, c.id),
      })),
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
