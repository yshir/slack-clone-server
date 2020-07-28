const UnauthorizedError = require('../../../lib/errors/unauthorized-error')

describe('Unauthorized Error test', () => {
  test('property check', () => {
    const unauthorizedError = new UnauthorizedError('test')
    expect(unauthorizedError.name).toBe('UnauthorizedError')
    expect(unauthorizedError.message).toBe('test')
    expect(unauthorizedError.status).toBe(401)
  })
})
