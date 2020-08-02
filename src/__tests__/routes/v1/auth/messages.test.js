const request = require('supertest')
const utils = require('../../../utils')
const app = require('../../../../app')

let channel
let token
beforeAll(async () => {
  const workspace = await utils.createWorkspace()
  const user = await utils.createUser({ workspace_id: workspace.id })
  channel = await utils.createChannel({ workspace_id: workspace.id })
  await utils.createChannelUser({ channel_id: channel.id, user_id: user.id })
  await utils.createMessage({ channel_id: channel.id, user_id: user.id })

  token = await utils.getToken(user)
})

afterAll(async () => {
  await utils.truncateMessage()
  await utils.truncateUser()
  await utils.truncateChannel()
  await utils.truncateWorkspace()
})

describe('GET: /v1/auth/messages', () => {
  describe('valid request', () => {
    it('returns messages', done => {
      request(app)
        .get('/v1/auth/messages')
        .query({ channel_id: channel.id })
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('messages')
          expect(res.body.messages[0]).toHaveProperty('channel_id')
          expect(res.body.messages[0]).toHaveProperty('text')
          expect(res.body.messages[0]).toHaveProperty('user')
          expect(res.body.messages[0].user).toHaveProperty('username')
          expect(res.body.messages[0].user).toHaveProperty('displayname')
          expect(res.body.messages[0].user).toHaveProperty('avatar_url')
          expect(res.body.messages[0].user).not.toHaveProperty('password')
          done()
        })
    })
  })

  describe('no channel_id', () => {
    it('returns 400', done => {
      request(app)
        .get('/v1/auth/messages')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .get('/v1/auth/messages')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})

describe('POST: /v1/auth/messages', () => {
  describe('valid request', () => {
    it('creates message', done => {
      request(app)
        .post('/v1/auth/messages')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          channel_id: channel.id,
          text: 'TEXT',
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body.message).toHaveProperty('text')
          expect(res.body.message).toHaveProperty('created_at')
          expect(res.body.message.text).toBe('TEXT')
          expect(res.body.message.channel_id).toBe(channel.id)
          done()
        })
    })
  })

  describe('no channel_id', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/auth/messages')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          text: 'TEXT',
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no text', () => {
    it('returns 400', done => {
      request(app)
        .post('/v1/auth/messages')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          channel_id: channel.id,
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .post('/v1/auth/messages')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
