const Joi = require('@hapi/joi')

const userSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(2).max(50).required(),
  lastname: Joi.string().alphanum().min(2).max(50).required(),
  username: Joi.string().alphanum().min(2).max(20).required(),
  password: Joi.string().length(8).required(),
  currency: Joi.string().valid('eur', 'usd', 'cop')
})

module.exports = userSchema
