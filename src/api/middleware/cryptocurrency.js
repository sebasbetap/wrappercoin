const cryptoService = require('../../services/cryptocurrency')

const isValid = async (req, res, next) => {
  try {
    await cryptoService.isValid(req.body.name)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isValid
}
