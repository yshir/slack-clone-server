const request = require('supertest')
const utils = require('../../../utils')
const app = require('../../../../app')

let token

beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  const user = await utils.createUser({ workspace_id: workspace.id })
  await utils.createChannel({ workspace_id: workspace.id })

  token = await utils.getToken(user)
})

afterAll(async () => {
  await utils.truncateWorkspace()
  await utils.truncateChannel()
  await utils.truncateUser()
})

describe('GET: /v1/auth/channels', () => {
  describe('valid request', () => {
    it('returns channels', done => {
      request(app)
        .get('/v1/auth/channels')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('channels')
          expect(res.body.channels[0]).toHaveProperty('id')
          expect(res.body.channels[0]).toHaveProperty('name')
          expect(res.body.channels[0]).toHaveProperty('is_joined')
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .get('/v1/auth/channels')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})

describe('POST: /v1/auth/channels', () => {
  describe('valid request', () => {
    it('creates channel', done => {
      request(app)
        .post('/v1/auth/channels')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: `CHANNEL_${Date.now()}`,
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('channel')
          expect(res.body.channel).toHaveProperty('id')
          expect(res.body.channel).toHaveProperty('name')
          done()
        })
    })
  })

  describe('no name', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/auth/channels')
        .set({ Authorization: `Bearer ${token}` })
        .send({})
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .put('/v1/auth/channels')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
