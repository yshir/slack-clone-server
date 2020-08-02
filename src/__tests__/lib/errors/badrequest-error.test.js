const BadRequestError = require('../../../lib/errors/badrequest-error')

describe('Bad Request Error test', () => {
  test('property check', () => {
    const badRequestError = new BadRequestError('test')
    expect(badRequestError.name).toBe('BadRequestError')
    expect(badRequestError.message).toBe('test')
    expect(badRequestError.status).toBe(400)
  })
})
