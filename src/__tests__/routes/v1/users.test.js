const request = require('supertest')

const app = require('../../../app')
const utils = require('../../utils')
const userInvitationHelper = require('../../../helpers/user-invitation')

const params = {
  token: null,
  username: `USERNAME_${Date.now()}`,
  password: `PASSWORD_${Date.now()}`,
}

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  await utils.createChannel({ workspace_id: workspace.id, name: 'general' })
  await utils.createChannel({ workspace_id: workspace.id, name: 'random' })
  params.token = await userInvitationHelper.createToken(workspace.id)
})

afterAll(async () => {
  await utils.truncateUser()
  await utils.truncateWorkspace()
})

describe('POST: /v1/users', () => {
  describe('valid request', () => {
    it('returns token', done => {
      request(app)
        .post('/v1/users')
        .send(params)
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('default_channel')
          expect(res.body.default_channel).toHaveProperty('id')
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/users')
        .send({ ...params, token: null })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no username', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/users')
        .send({ ...params, username: null })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no password', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/users')
        .send({ ...params, password: null })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })
})
