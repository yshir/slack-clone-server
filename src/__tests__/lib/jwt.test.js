const jwt = require('../../lib/jwt')

describe('createToken', () => {
  it('creates and returns jwt token', async () => {
    const token = await jwt.createToken({ userid: 123 })
    expect(token).not.toBeUndefined()
  })
})

describe('decodeToken', () => {
  describe('params is valid token', () => {
    it('returns decoded token', async () => {
      const token = await jwt.createToken({ userid: 123 })
      const res = jwt.decodeToken(token)
      expect(res.userid).toBe(123)
    })
  })

  describe('params is invalid token', () => {
    it('returns null', async () => {
      const token = await jwt.createToken({ userid: 123 })
      const res = jwt.decodeToken(`###${token}###`)
      expect(res).toEqual(null)
    })
  })

  describe('params is empty', () => {
    it('returns null', () => {
      const res = jwt.decodeToken()
      expect(res).toEqual(null)
    })
  })
})
