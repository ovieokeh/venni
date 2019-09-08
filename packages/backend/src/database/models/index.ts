import { Sequelize } from 'sequelize'

require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config/config.js`)[env]

const sequelize = config.use_env_variable
  ? new Sequelize(config.use_env_variable, config)
  : new Sequelize(config.database, config.username, config.password, config)

export default sequelize
