const ValidationError = require('../../../lib/errors/validation-error')

describe('Validation Error test', () => {
  test('property check', () => {
    const validationError = new ValidationError('test', ['hoge', 'fuga'])
    expect(validationError.name).toBe('ValidationError')
    expect(validationError.message).toBe('test')
    expect(validationError.status).toBe(400)
    expect(validationError.details).toEqual(['hoge', 'fuga'])
  })
})
