const jwt = require('jsonwebtoken')

const options = {
  expiresIn: '1d'
}

function sign (payload, secret) {
  return jwt.sign(payload, secret, options)
}

function verify (token, secret) {
  return jwt.verify(token, secret)
}

module.exports = {
  sign,
  verify
}
