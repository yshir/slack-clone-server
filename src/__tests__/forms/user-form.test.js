const uuid = require('uuid')
const utils = require('../utils')
const UserForm = require('../../forms/user-form')

const params = {
  id: uuid.v4(),
  username: 'USER_NAME',
  displayname: 'DISPLAY_NAME',
  password: 'PASSWORD',
}

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  params.workspace_id = workspace.id
  await utils.createChannel({ workspace_id: workspace.id, name: 'general' })
  await utils.createChannel({ workspace_id: workspace.id, name: 'random' })
})

afterAll(async () => {
  await utils.truncateUser()
  await utils.truncateChannel()
  await utils.truncateWorkspace()
})

describe('Parameter Test', () => {
  describe('workspace_id is null', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, workspace_id: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('workspace_id is invalid', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, workspace_id: 'ecf3a13c-c430-4b89-9d7b-559c26ed306e' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('username is null', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, username: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('username is blank', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, username: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('displayname is null', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, displayname: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('displayname is blank', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, displayname: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('password is null', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, password: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('password is blank', () => {
    it('throws error', () => {
      const form = new UserForm({ ...params, password: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates successfully', async () => {
      const form = new UserForm(params)
      await form.save()

      const user = form.user
      const channels = await user.getChannels()

      expect(user).toHaveProperty('id')
      expect(user.id).toBe(params.id)
      expect(channels.length).not.toBe(0)
    })
  })
})
