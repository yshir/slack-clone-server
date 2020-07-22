const models = require('../../models')

const utils = {
  createWorkspace: async (params = {}) => {
    return await models.Workspace.create({
      name: params.name !== undefined ? params.name : `NAME_${Date.now()}`,
    })
  },
  truncateWorkspace: async () => {
    return await models.Workspace.destroy({ truncate: { cascade: true } })
  },
  createUser: async (params = {}) => {
    return await models.User.create({
      workspace_id: params.workspace_id !== undefined ? params.workspace_id : (await utils.createWorkspace()).id,
      username: params.username !== undefined ? params.username : `USERNAME_${Date.now()}`,
      displayname: params.displayname !== undefined ? params.displayname : `DISPLAYNAME_${Date.now()}`,
      password: params.password !== undefined ? params.password : 'PASSWORD',
      avater_url: params.avater_url !== undefined ? params.avater_url : 'https://example.com/avater_url',
    })
  },
  truncateUser: async () => {
    return await models.User.destroy({ truncate: { cascade: true } })
  },
  createMessage: async (params = {}) => {
    return await models.Message.create({
      text: params.text !== undefined ? params.text : 'TEXT',
    })
  },
  truncateMessage: async () => {
    return await models.Message.destroy({ truncate: { cascade: true } })
  },
  createChannel: async (params = {}) => {
    return await models.Channel.create({
      workspace_id: params.workspace_id !== undefined ? params.workspace_id : (await utils.createWorkspace()).id,
      name: params.name !== undefined ? params.name : `NAME_${Date.now()}`,
    })
  },
  truncateChannel: async () => {
    return await models.Channel.destroy({ truncate: { cascade: true } })
  },
  createChannelUser: async (params = {}) => {
    return await models.ChannelUser.create({
      channel_id: params.channel_id !== undefined ? params.channel_id : (await utils.createChannel()).id,
      user_id: params.user_id !== undefined ? params.user_id : (await utils.createUser()).id,
    })
  },
  truncateChannelUser: async () => {
    return await models.ChannelUser.destroy({ truncate: { cascade: true } })
  },
}

module.exports = utils
