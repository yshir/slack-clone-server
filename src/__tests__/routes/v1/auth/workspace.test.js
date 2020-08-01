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

describe('GET: /v1/auth/workspace', () => {
  describe('valid request', () => {
    it('returns me', done => {
      request(app)
        .get('/v1/auth/workspace')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('workspace')
          expect(res.body.workspace).toHaveProperty('name')
          done()
        })
    })
  })

  describe('no token', () => {
    it('returns 401', done => {
      request(app)
        .get('/v1/auth/workspace')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})

describe('PUT: /v1/auth/workspace', () => {
  describe('valid request', () => {
    it('update workspace', done => {
      request(app)
        .put('/v1/auth/workspace')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'UPDATED_NAME',
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body).toHaveProperty('workspace')
          expect(res.body.workspace.name).toBe('UPDATED_NAME')
          done()
        })
    })
  })

  describe('no name', () => {
    it('returns 400', done => {
      request(app)
        .put('/v1/auth/workspace')
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
        .put('/v1/auth/workspace')
        .then(res => {
          expect(res.statusCode).toBe(401)
          done()
        })
    })
  })
})
