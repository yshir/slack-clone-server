const utils = require('../utils')
const jwt = require('../../lib/jwt')
const userInvitationHelper = require('../../helpers/user-invitation')

let workspace
beforeAll(async () => {
  workspace = await utils.createWorkspace()
})

describe('createToken', () => {
  describe('params is valid workspace id', () => {
    it('creates and returns token', async () => {
      const token = await userInvitationHelper.createToken(workspace.id)
      expect(token).not.toBeUndefined()
    })
  })

  describe('params is invalid workspace id', () => {
    it('throws error', () => {
      expect(userInvitationHelper.createToken('invalid-id')).rejects.toThrow()
    })
  })

  describe('params is empty', () => {
    it('throws error', () => {
      expect(userInvitationHelper.createToken()).rejects.toThrow()
    })
  })
})

describe('decodeToken', () => {
  describe('params is valid token', () => {
    it('returns workspace_id, user_id and token_type', async () => {
      const token = await userInvitationHelper.createToken(workspace.id)
      const decoded = await userInvitationHelper.decodeToken(token)
      expect(decoded.token_type).toBe('user_invitation')
      expect(decoded.workspace_id).toBe(workspace.id)
      expect(decoded.user_id).not.toBeUndefined()
    })
  })

  describe('params is invalid token (random string)', () => {
    it('throws error', () => {
      const token = 'invalid-token'
      expect(() => {
        userInvitationHelper.decodeToken(token)
      }).toThrow()
    })
  })

  describe('params is invalid token (token_type !== user_invitation)', () => {
    it('throws error', async () => {
      const token = await jwt.createToken({ token_type: 'invalid-token-type' })
      expect(() => {
        userInvitationHelper.decodeToken(token)
      }).toThrow()
    })
  })

  describe('params is empty', () => {
    it('throws error', () => {
      expect(() => {
        userInvitationHelper.decodeToken()
      }).toThrow()
    })
  })
})
