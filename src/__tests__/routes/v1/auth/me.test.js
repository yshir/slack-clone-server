const request = require('supertest')
const utils = require('../../../utils')
const app = require('../../../../app')

let token
beforeAll(async () => {
  token = await utils.getToken()
})

afterAll(async () => {
  await utils.truncateWorkspace()
  await utils.truncateUser()
})

describe('GET: /v1/auth/me', () => {
  describe('valid request', () => {
    it('returns me', done => {
      request(app)
        .get('/v1/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('username')
          expect(res.body).toHaveProperty('displayname')
          expect(res.body).toHaveProperty('avatar_url')
          expect(res.body).not.toHaveProperty('password')
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .get('/v1/auth/me')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})

describe('PUT: /v1/auth/me', () => {
  describe('valid request', () => {
    it('updates and returns me', done => {
      request(app)
        .put('/v1/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          username: 'updated_username',
          displayname: 'updated_displayname',
          avatar_url: 'https://example.com/hoge',
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('updated_username')
          expect(res.body.displayname).toBe('updated_displayname')
          expect(res.body.avatar_url).toBe('https://example.com/hoge')
          expect(res.body).not.toHaveProperty('password')
          done()
        })
    })
  })

  describe('invalid request with empty username', () => {
    it('updates and returns me', done => {
      request(app)
        .put('/v1/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          username: '',
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('invalid request with invalid url format avatar_url', () => {
    it('updates and returns me', done => {
      request(app)
        .put('/v1/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          avatar_url: 'invalid-url',
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
        .put('/v1/auth/me')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
