const express = require('express')
const auth = require('express-jwt')
const validator = require('express-joi-validation').createValidator({})
const config = require('../../config')
const { cryptoMiddleware, userMiddleware } = require('../middleware')
const { cryptocurrencies } = require('../../controller')
const { cryptoSchema } = require('../schemas')

const route = express.Router()

module.exports = (app) => {
  app.use('/cryptos', route)

  route.post('/', auth(config.auth), validator.body(cryptoSchema), cryptoMiddleware.isValid, cryptocurrencies.createUser)
  route.get('/me', auth(config.auth), userMiddleware.getOne, cryptocurrencies.findAllByUser)
  route.get('/top', auth(config.auth), userMiddleware.getOne, cryptocurrencies.topByUser)
}
