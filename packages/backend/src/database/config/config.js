require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: null,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    dialect: 'postgres'
  }
}
