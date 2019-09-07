require('dotenv').config()

console.log('============================================', {
  username: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE,
  host: process.env.TEST_DATABASE_HOST,
  port: +process.env.TEST_DATABASE_PORT,
  logging: false,
  dialect: 'postgres'
})

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_DATABASE_HOST,
    port: +process.env.TEST_DATABASE_PORT,
    logging: false,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
}
