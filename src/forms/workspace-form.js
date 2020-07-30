const models = require('../models')

class WorkspaceForm {
  constructor(params) {
    this.params = params
    this.workspace = null
    this.user = null
    this.channels = null
  }

  async save() {
    await models.sequelize.transaction(async t => {
      await this._createWorkspace(t)
      await this._createUser(t)
      await this._createDefaultChannels(t)
    })
  }

  async _createWorkspace(t) {
    const workspace = await models.Workspace.create(
      {
        name: this.params.workspace_name,
      },
      { transaction: t },
    )
    this.workspace = workspace
  }

  async _createUser(t) {
    const user = await this.workspace.createUser(
      {
        username: this.params.username,
        displayname: this.params.username,
        password: this.params.password,
      },
      { transaction: t },
    )
    this.user = user
  }

  async _createDefaultChannels(t) {
    const generalChannel = await this.workspace.createChannel({ name: 'general' }, { transaction: t })
    const randomChannel = await this.workspace.createChannel({ name: 'random' }, { transaction: t })
    this.channels = [generalChannel, randomChannel]
    this.user.setChannels(this.channels)
  }
}

module.exports = WorkspaceForm
