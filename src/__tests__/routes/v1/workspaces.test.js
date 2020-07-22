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
          expect(res.body.data[0]).toHaveProperty('name')
          done()
        })
    })
  })
})
