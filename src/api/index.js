const express = require('express')
const users = require('./routes/user')
const crypto = require('./routes/cryptocurrency')

module.exports = () => {
  const app = express.Router()
  users(app)
  crypto(app)
  return app
}
