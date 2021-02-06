const cryptoService = require('../services/cryptocurrency')
const { ErrorHandler } = require('../helpers/error')

const createUser = async (req, res, next) => {
  try {
    const cryptocurrency = await cryptoService.createOne(req.user.id, req.body.name)
    if (!cryptocurrency) return next(new ErrorHandler(500, 'the cryptocurrency could not be created'))
    res.status(201).send('cryptocurrency created successfully')
  } catch (error) {
    next(error)
  }
}

const findAllByUser = async (req, res, next) => {
  const cryptocurrencies = await cryptoService.findAllByUser(req.user.id)
  const response = await cryptoService.getDataCryptocurrency(cryptocurrencies, req.userRegistered.currency)
  res.send(response)
}

const topByUser = async (req, res, next) => {
  const cryptocurrencies = await cryptoService.findAllByUser(req.user.id)
  let response = await cryptoService.getDataCryptocurrency(cryptocurrencies, req.userRegistered.currency)
  response = cryptoService.orderListbyPrice(response).slice(0, 3)
  res.send(response)
}

module.exports = {
  createUser,
  findAllByUser,
  topByUser
}
