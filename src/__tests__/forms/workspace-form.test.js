const WorkspaceForm = require('../../forms/workspace-form')

const params = {
  workspace_name: 'WORKSPAACE_NAME',
  username: 'USER_NAME',
  password: 'PASSWORD',
}

describe('Parameter Test', () => {
  describe('workspace_name is null', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, workspace_name: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('workspace_name is blank', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, workspace_name: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('username is null', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, username: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('username is blank', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, username: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('password is null', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, password: null })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('password is blank', () => {
    it('throws error', () => {
      const form = new WorkspaceForm({ ...params, password: '' })
      expect(form.save()).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates successfully', async () => {
      const form = new WorkspaceForm(params)
      await form.save()

      const workspace = form.workspace
      const user = form.user
      const channels = await workspace.getChannels()

      expect(user).toHaveProperty('id')
      expect(workspace).toHaveProperty('id')
      expect(channels.length).toBe(2)
    })
  })
})
