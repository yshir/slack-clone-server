const utils = require('../utils')
const models = require('../../models')

const params = {}

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  const channel = await utils.createChannel({ workspace_id: workspace.id })
  const user = await utils.createUser({ workspace_id: workspace.id })

  params.channel_id = channel.id
  params.user_id = user.id
})

afterAll(async () => {
  await utils.truncateChannelUser()
  await utils.truncateChannel()
  await utils.truncateUser()
  await utils.truncateWorkspace()
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
