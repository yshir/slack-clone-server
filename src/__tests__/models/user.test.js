const models = require('../../models')
const { before } = require('lodash')

const params = {
  username: 'USERNAME',
  displayname: 'DISPLAYNAME',
  password: 'PASSWORD',
  avatar_url: 'https://example.com/hoge.jpg',
}

beforeAll(async () => {
  const workspace = await models.Workspace.create({ name: 'NAME' })
  params.workspace_id = workspace.id
})

afterAll(async () => {
  await models.User.destroy({ truncate: { cascade: true } })
  await models.Workspace.destroy({ truncate: { cascade: true } })
})

describe('Parameter Test', () => {
  describe('workspace_id is null', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, workspace_id: null })).rejects.toThrow()
    })
  })

  describe('workspace_id is invlalid', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, workspace_id: 'invalid_id' })).rejects.toThrow()
    })
  })

  describe('username is null', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, username: null })).rejects.toThrow()
    })
  })

  describe('username is empty', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, username: '' })).rejects.toThrow()
    })
  })

  describe('displayname is null', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, displayname: null })).rejects.toThrow()
    })
  })

  describe('displayname is empty', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, displayname: '' })).rejects.toThrow()
    })
  })

  describe('password is null', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, password: null })).rejects.toThrow()
    })
  })

  describe('password is empty', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, password: '' })).rejects.toThrow()
    })
  })

  describe('avatar_url is not url', () => {
    it('can not create user', async () => {
      expect(models.User.create({ ...params, avatar_url: 'not_url' })).rejects.toThrow()
    })
  })

  describe('valid parameters', () => {
    it('creates user', async () => {
      const user = await models.User.create(params)
      expect(user.id).not.toBeUndefined()
    })
  })
})

describe('Method Test', () => {
  describe('beforeSave', () => {
    describe('password', () => {
      it('is hashed', async () => {
        const user = await models.User.create({ ...params, username: 'beforesave-test-user', password: 'raw-password' })
        expect(user.password).not.toBe('raw-password')
      })
    })
  })

  describe('isValidPassword', () => {
    describe('correct password', () => {
      it('returns true', async () => {
        const user = await models.User.create({ ...params, username: 'isvalidpassword-test-user1', password: 'AAAAAAAAAA' })
        expect(user.isValidPassword('AAAAAAAAAA')).toBe(true)
      })
    })

    describe('incorrect password', () => {
      it('returns false', async () => {
        const user = await models.User.create({ ...params, username: 'isvalidpassword-test-user2', password: 'AAAAAAAAAA' })
        expect(user.isValidPassword('BBBBBBBBBB')).toBe(false)
      })
    })
  })
})
