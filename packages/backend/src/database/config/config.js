require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.TEST_DATABASE_USER,
    password: null,
    database: process.env.TEST_DATABASE,
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
}
