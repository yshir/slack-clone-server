const _ = require('lodash')
const models = require('../models')
const ApplicationError = require('../lib/errors/application-error')

class userForm {
  constructor(params) {
    this.params = params
    this.user = null
    this.channels = []
  }

  async save() {
    await models.sequelize.transaction(async t => {
      await this._createUser(t)
      await this._associateDefaultChannels(t)
    })
  }

  async _createUser(t) {
    this.user = await models.User.create(this.params, { transaction: t })
  }

  async _associateDefaultChannels(t) {
    const generalChannel = await models.Channel.findOne({
      where: {
        workspace_id: this.params.workspace_id,
        name: 'general',
      },
    })
    if (generalChannel) {
      this.channels.push(generalChannel)
    }
    const randomChannel = await models.Channel.findOne({
      where: {
        workspace_id: this.params.workspace_id,
        name: 'random',
      },
    })
    if (randomChannel) {
      this.channels.push(randomChannel)
    }

    if (this.channels.length === 0) {
      throw new ApplicationError('Default channels are not exist')
    }
    await this.user.setChannels(this.channels, { transaction: t })
  }
}

module.exports = userForm
