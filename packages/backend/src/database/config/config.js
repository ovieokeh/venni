require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'venni_test',
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
}
