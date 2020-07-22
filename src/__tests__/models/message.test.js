const models = require('../../models')
const utils = require('../utils')

const params = {
  text: 'TEXT',
}

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  const channel = await utils.createChannel({ workspace_id: workspace.id })
  const user = await utils.createUser({ workspace_id: workspace.id })

  params.channel_id = channel.id
  params.user_id = user.id

  await utils.createChannelUser({ channel_id: channel.id, user_id: user.id })
})

afterAll(async () => {
  await utils.truncateMessage()
  await utils.truncateChannelUser()
  await utils.truncateChannel()
  await utils.truncateUser()
  await utils.truncateWorkspace()
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
