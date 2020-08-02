const request = require('supertest')
const utils = require('../../../utils')
const app = require('../../../../app')

let token
beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  const user = await utils.createUser({ workspace_id: workspace.id })
  token = await utils.getToken(user)
})

afterAll(async () => {
  await utils.truncateUser()
  await utils.truncateWorkspace()
})

describe('POST: /v1/auth/users', () => {
  describe('valid request', () => {
    it('returns invitation token', done => {
      request(app)
        .post('/v1/auth/users')
        .set({ Authorization: `Bearer ${token}` })
        .send({})
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('token')
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .post('/v1/auth/users')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
