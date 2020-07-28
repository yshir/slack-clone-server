const utils = require('../utils')
const jwt = require('../../lib/jwt')
const authHelper = require('../../helpers/auth')

let _user
beforeAll(async () => {
  _user = await utils.createUser()
})

describe('createTokenByUserId', () => {
  describe('params is valid user id', () => {
    it('creates and returns token', async () => {
      const token = await authHelper.createTokenByUserId(_user.id)
      expect(token).not.toBeUndefined()
    })
  })

  describe('params is invalid user id', () => {
    it('throws error', () => {
      expect(authHelper.createTokenByUserId('invalid-id')).rejects.toThrow()
    })
  })

  describe('params is empty', () => {
    it('throws error', () => {
      expect(authHelper.createTokenByUserId()).rejects.toThrow()
    })
  })
})

describe('getUserByToken', () => {
  describe('params is valid token', () => {
    it('returns user', async () => {
      const token = await authHelper.createTokenByUserId(_user.id)
      const user = await authHelper.getUserByToken(token)
      expect(user).toHaveProperty('id')
    })
  })

  describe('params is invalid token (random string)', () => {
    it('throws error', () => {
      const token = 'invalid-token'
      expect(authHelper.getUserByToken(token)).rejects.toThrow()
    })
  })

  describe('params is invalid token (unexist user)', () => {
    it('throws error', async () => {
      const token = await jwt.createToken({ user_id: 'invalid-user-id' })
      expect(authHelper.getUserByToken(token)).rejects.toThrow()
    })
  })

  describe('params is empty', () => {
    it('throws error', () => {
      expect(authHelper.getUserByToken()).rejects.toThrow()
    })
  })
})
