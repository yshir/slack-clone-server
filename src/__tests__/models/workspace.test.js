const models = require('../../models')
const utils = require('../utils')

afterAll(async () => {
  await utils.truncateWorkspace()
})

const params = {
  name: 'NAME',
}

describe('Parameter Test', () => {
  describe('name is null', () => {
    it('can not create workspace', async () => {
      expect(models.Workspace.create({ ...params, name: null })).rejects.toThrow()
    })
  })

  describe('name is empty', () => {
    it('can not create workspace', async () => {
      expect(models.Workspace.create({ ...params, name: '' })).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates workspace', async () => {
      const workspace = await models.Workspace.create({ ...params, name: 'NAME' })
      expect(workspace.id).not.toBeUndefined()
    })
  })
})
