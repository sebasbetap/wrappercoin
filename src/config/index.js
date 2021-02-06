const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'develop'

const envFound = dotenv.config() // load the .env file
if (!envFound) {
  console.log('File .env does not exist')
}

module.exports = {
  port: process.env.PORT || 5000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  db: {
    username: process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql'
  },
  auth: {
    secret: process.env.JWT_SECRET || 'notasecret!'
  },
  bravenewcoin: {
    key: process.env.BRAVENEWCOIN_KEY
  }
}
