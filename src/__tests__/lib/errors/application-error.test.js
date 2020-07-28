const ApplicationError = require('../../../lib/errors/application-error')

describe('Application Error test', () => {
  test('property check', () => {
    const applicationError = new ApplicationError('test', 999)
    expect(applicationError.name).toBe('ApplicationError')
    expect(applicationError.message).toBe('test')
    expect(applicationError.status).toBe(999)
  })
})
