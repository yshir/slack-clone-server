const request = require('supertest')

const app = require('../../../app')
const utils = require('../../utils')

beforeAll(async () => {
  await utils.createWorkspace()
})

afterAll(async () => {
  await utils.truncateWorkspace()
})

describe('GET: /v1/workspaces', () => {
  describe('request without query', () => {
    it('returns workspaces', done => {
      request(app)
        .get('/v1/workspaces')
        .then(res => {
          expect(res.statusCode).toBe(200)
          expect(res.body.workspaces[0]).toHaveProperty('name')
          done()
        })
    })
  })
})

describe('POST: /v1/workspaces', () => {
  describe('valid request', () => {
    it('creates workspaces and user', done => {
      request(app)
        .post('/v1/workspaces')
        .send({
          workspace_name: 'NAME',
          username: 'USER',
          password: 'QAZXSWEDCVFR',
        })
        .then(res => {
          expect(res.statusCode).toBe(200)
          done()
        })
    })
  })

  describe('invalid request without workspace_name', () => {
    it('creates workspaces and user', done => {
      request(app)
        .post('/v1/workspaces')
        .send({
          username: 'USER',
          password: 'QAZXSWEDCVFR',
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('invalid request without username', () => {
    it('creates workspaces and user', done => {
      request(app)
        .post('/v1/workspaces')
        .send({
          workspace_name: 'NAME',
          password: 'QAZXSWEDCVFR',
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })

  describe('invalid request without password', () => {
    it('creates workspaces and user', done => {
      request(app)
        .post('/v1/workspaces')
        .send({
          workspace_name: 'NAME',
          username: 'USER',
        })
        .then(res => {
          expect(res.statusCode).toBe(400)
          done()
        })
    })
  })
})
