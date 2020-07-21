const models = require('../../models')

const params = {}

beforeAll(async () => {
  const workspace = await models.Workspace.create({ name: 'NAME' })

  const channel = await models.Channel.create({ workspace_id: workspace.id, name: 'name' })
  params.channel_id = channel.id

  const user = await models.User.create({ workspace_id: workspace.id, username: 'name', displayname: 'name', password: 'password' })
  params.user_id = user.id
})

afterAll(async () => {
  await models.ChannelUser.destroy({ truncate: { cascade: true } })
  await models.Channel.destroy({ truncate: { cascade: true } })
  await models.User.destroy({ truncate: { cascade: true } })
  await models.Workspace.destroy({ truncate: { cascade: true } })
})

describe('Parameter Test', () => {
  describe('channel_id is null', () => {
    it('can not create channel_user', async () => {
      expect(models.ChannelUser.create({ ...params, channel_id: null })).rejects.toThrow()
    })
  })

  describe('channel_id is invlalid', () => {
    it('can not create channel_user', async () => {
      expect(models.ChannelUser.create({ ...params, channel_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('user_id is null', () => {
    it('can not create channel_user', async () => {
      expect(models.ChannelUser.create({ ...params, user_id: null })).rejects.toThrow()
    })
  })

  describe('user_id is invlalid', () => {
    it('can not create channel_user', async () => {
      expect(models.ChannelUser.create({ ...params, user_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates channel_user', async () => {
      const channelUser = await models.ChannelUser.create(params)
      expect(channelUser.id).not.toBeUndefined()
    })
  })
})
