const models = require('../../models')

const params = {
  name: 'NAME',
}

beforeAll(async () => {
  const workspace = await models.Workspace.create({ name: 'NAME' })
  params.workspace_id = workspace.id
})

afterAll(async () => {
  await models.Channel.destroy({ truncate: { cascade: true } })
  await models.Workspace.destroy({ truncate: { cascade: true } })
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
