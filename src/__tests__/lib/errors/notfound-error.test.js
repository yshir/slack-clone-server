const NotFoundError = require('../../../lib/errors/notfound-error')

describe('NotFound Error test', () => {
  test('property check', () => {
    const notFoundError = new NotFoundError('test')
    expect(notFoundError.name).toBe('NotFoundError')
    expect(notFoundError.message).toBe('test')
    expect(notFoundError.status).toBe(404)
  })
})
