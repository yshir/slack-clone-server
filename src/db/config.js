require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+09:00',
  },
  staging: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+09:00',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+09:00',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    timezone: '+09:00',
    logging: false,
  },
}
