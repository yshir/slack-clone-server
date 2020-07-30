const request = require('supertest')

const app = require('../../../app')
const utils = require('../../utils')

const params = {
  workspace_name: `WORKSPACE_${Date.now()}`,
  username: `USERNAME_${Date.now()}`,
  password: `PASSWORD_${Date.now()}`,
}

beforeAll(async () => {
  const workspace = await utils.createWorkspace({ name: params.workspace_name })
  const channel = await utils.createChannel({ workspace_id: workspace.id })
  const user = await utils.createUser({
    workspace_id: workspace.id,
    username: params.username,
    password: params.password,
  })
  await utils.createChannelUser({ channel_id: channel.id, user_id: user.id })
})

afterAll(async () => {
  await utils.truncateUser()
  await utils.truncateWorkspace()
})

describe('POST: /v1/login', () => {
  describe('valid request', () => {
    it('returns token', done => {
      request(app)
        .post('/v1/login')
        .send({
          workspace_name: params.workspace_name,
          username: params.username,
          password: params.password,
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('default_channel')
          expect(res.body.default_channel).toHaveProperty('id')
          done()
        })
    })
  })

  describe('invalid request with incorrect workspace_name', () => {
    it('returns 401', done => {
      request(app)
        .post('/v1/login')
        .send({
          workspace_name: 'incorrect-workspace-name',
          username: params.username,
          password: params.password,
        })
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })

  describe('invalid request with incorrect username', () => {
    it('returns 401', done => {
      request(app)
        .post('/v1/login')
        .send({
          workspace_name: params.workspace_name,
          username: 'invalid-username',
          password: params.password,
        })
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })

  describe('invalid request with incorrect password', () => {
    it('returns 401', done => {
      request(app)
        .post('/v1/login')
        .send({
          workspace_name: params.workspace_name,
          username: params.username,
          password: 'invalid-password',
        })
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
