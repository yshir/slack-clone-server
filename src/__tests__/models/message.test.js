const models = require('../../models')

const params = {
  text: 'TEXT',
}

beforeAll(async () => {
  const workspace = await models.Workspace.create({ name: 'NAME' })

  const channel = await models.Channel.create({ workspace_id: workspace.id, name: 'name' })
  params.channel_id = channel.id

  const user = await models.User.create({ workspace_id: workspace.id, username: 'name', displayname: 'name', password: 'password' })
  params.user_id = user.id

  await models.ChannelUser.create({ channel_id: channel.id, user_id: user.id })
})

afterAll(async () => {
  await models.Message.destroy({ truncate: { cascade: true } })
  await models.ChannelUser.destroy({ truncate: { cascade: true } })
  await models.Channel.destroy({ truncate: { cascade: true } })
  await models.User.destroy({ truncate: { cascade: true } })
  await models.Workspace.destroy({ truncate: { cascade: true } })
})

describe('Parameter Test', () => {
  describe('text is null', () => {
    it('can not create message', async () => {
      expect(models.Message.create({ ...params, text: null })).rejects.toThrow()
    })
  })

  describe('text is empty', () => {
    it('can not create message', async () => {
      expect(models.Message.create({ ...params, text: '' })).rejects.toThrow()
    })
  })

  describe('channel_id is null', () => {
    it('can not create message', async () => {
      expect(models.Message.create({ ...params, channel_id: null })).rejects.toThrow()
    })
  })

  describe('channel_id is invlalid', () => {
    it('can not create message', async () => {
      expect(models.Message.create({ ...params, channel_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('user_id is null', () => {
    it('creates message', async () => {
      const message = await models.Message.create({ ...params, user_id: null })
      expect(message.id).not.toBeUndefined()
    })
  })

  describe('user_id is invlalid', () => {
    it('can not create message', async () => {
      expect(models.Message.create({ ...params, user_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates message', async () => {
      const message = await models.Message.create(params)
      expect(message.id).not.toBeUndefined()
    })
  })
})
