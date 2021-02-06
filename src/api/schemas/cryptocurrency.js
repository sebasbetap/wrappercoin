const Joi = require('@hapi/joi')

const cryptoSchema = Joi.object().keys({
  name: Joi.string().required()
})

module.exports = cryptoSchema
