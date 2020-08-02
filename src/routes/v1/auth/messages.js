const _ = require('lodash')
const express = require('express')
const router = express.Router()

const config = require('../../../config')
const models = require('../../../models')
const ValidationError = require('../../../lib/errors/validation-error')
const messageRequest = require('../../../middlewares/requests/message-request')

router.get('/', async (req, res, next) => {
  try {
    const { channel_id } = req.query
    if (!channel_id) {
      return next(new ValidationError('channel_id is required'))
    }

    const channel = await models.Channel.findOne({
      where: {
        id: channel_id,
        workspace_id: req.user.workspace.id,
      },
    })
    if (!channel) {
      return next(new ValidationError('channel not found'))
    }

    const messages = await models.Message.findAll({
      where: { channel_id },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['username', 'displayname', 'avatar_url'],
        },
      ],
      order: [['created_at', 'DESC']],
    })

    res.json({
      messages: messages.map(m => ({
        channel_id: m.channel_id,
        text: m.text,
        created_at: m.created_at,
        user: {
          username: _.get(m, 'user.username'),
          displayname: _.get(m, 'user.displayname'),
          avatar_url: _.get(m, 'user.avatar_url'),
        },
      })),
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', messageRequest, async (req, res, next) => {
  try {
    const { channel_id, text } = req.body

    const channel = await models.Channel.findOne({
      where: {
        id: channel_id,
        workspace_id: req.user.workspace.id,
      },
      include: [
        {
          model: models.ChannelUser,
          as: 'channel_user',
          where: {
            user_id: req.user.id,
          },
        },
      ],
    })
    if (!channel) {
      return next(new ValidationError('channel not found'))
    }

    const message = await models.Message.create({ channel_id, user_id: req.user.id, text })

    const response = {
      message: {
        channel_id: message.channel_id,
        text: message.text,
        created_at: message.created_at,
        user: {
          username: req.user.username,
          displayname: req.user.displayname,
          avatar_url: req.user.avatar_url,
        },
      },
    }
    if (req.app.io) {
      req.app.io.emit(config.socket.events.update_message, response)
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
