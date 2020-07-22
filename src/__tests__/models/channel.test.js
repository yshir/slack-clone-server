const utils = require('../utils')
const models = require('../../models')

const params = {
  name: 'NAME',
}

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  params.workspace_id = workspace.id
})

afterAll(async () => {
  await utils.truncateChannel()
  await utils.truncateWorkspace()
})

describe('Parameter Test', () => {
  describe('workspace_id is null', () => {
    it('can not create channel', async () => {
      expect(models.Channel.create({ ...params, workspace_id: null })).rejects.toThrow()
    })
  })

  describe('workspace_id is invlalid', () => {
    it('can not create channel', async () => {
      expect(models.Channel.create({ ...params, workspace_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('name is null', () => {
    it('can not create channel', async () => {
      expect(models.Channel.create({ ...params, name: null })).rejects.toThrow()
    })
  })

  describe('name is empty', () => {
    it('can not create channel', async () => {
      expect(models.Channel.create({ ...params, name: '' })).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates channel', async () => {
      const channel = await models.Channel.create(params)
      expect(channel.id).not.toBeUndefined()
    })
  })
})
