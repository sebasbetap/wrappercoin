const axios = require('axios')

const db = require('../repository')
const { bravenewcoin, db: dbConfig } = require('../config')
const { ErrorHandler } = require('../helpers/error')
require('../docs/typedef')

const url = 'https://bravenewcoin-v1.p.rapidapi.com/ticker'
const descendingOrder = 'DES'

const config = {
  headers: {
    'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
    'x-rapidapi-key': bravenewcoin.key
  }
}

const apiResponseError = {
  400: 'cryptocurrency not found',
  401: 'Could not log in to cryptocurrency api services',
  default: 'error trying to validate the cryptocurrency'
}

/**
 * validate if the cryptomenda exists in the api
 * @param {string} coin cryptocurrency to validate
 */
const isValid = async (coin) => {
  try {
    return await axios.get(`${url}?coin=${coin}`, config)
  } catch (error) {
    throw createResponseError(error.response)
  }
}

/**
 * Create an ErrorHanlde object
 * @param {ErrorAxios} response axios error object
 */
const createResponseError = (response) => {
  return new ErrorHandler(response.status, apiResponseError[response.status] || apiResponseError.default)
}

/**
 * create a new cryptocurrency to a user
 * @param {string} userId primary user key
 * @param {string} name cryptocurrency name
 */
const createOne = async (userId, name) => {
  try {
    const { Cryptocurrencies } = await db(dbConfig)
    const cryptocurrency = await Cryptocurrencies.createOne(userId, { name })
    return cryptocurrency
  } catch (error) {
    return null
  }
}

/**
 * find all the cryptocurrencies of a user
 * @param {string} userId primary user key
 */
const findAllByUser = async (userId) => {
  const { Cryptocurrencies } = await db(dbConfig)
  const cryptocurrencies = await Cryptocurrencies.findAllByUser(userId)
  return cryptocurrencies
}

/**
 * Get the price information and the source of the brave api
 * @param {CryptocurrencyModel[]} cryptos
 * @param {string} userCurrency user's preferred currency
 * @returns {Promise<ResponseCryptocurrency>} Returns an object mapped with the information to respond
 */
const getDataCryptocurrency = async (cryptos, userCurrency) => {
  const promisesApi = []
  cryptos.forEach(crypto => {
    promisesApi.push(axios.get(`${url}?coin=${crypto.name}&show=${userCurrency}`, config))
  })
  const responsesApi = await Promise.all(promisesApi)
  const response = createResponse(responsesApi, userCurrency)
  return response
}

/**
 * go through an array mapping the answer
 * @param {ResponseAxios} responsesApi brave api response array
 * @param {string} userCurrency user's preferred currency
 * @returns {Promise<ResponseCryptocurrency>} Returns an object mapped with the information to respond
 */
const createResponse = (responsesApi, userCurrency) => {
  const response = []
  responsesApi.forEach(createResponseArray(response, userCurrency))
  return response
}

/**
 * filter the array of ascending or descending order
 * @param {ResponseCryptocurrency[]} list array response list with all values
 * @param {string} order list sorting, by default it is descending
 * @returns {ResponseCryptocurrency[]}
 */
const orderListbyPrice = (list, order = descendingOrder) => {
  return list.sort((a, b) => order === descendingOrder ? b.price - a.price : a.price - b.price)
}

/**
 * create an element to add to the array if the api answers information
 * @param {ResponseCryptocurrency[]} response response with all values
 * @param {*} userCurrency user's preferred currency
 */
const createResponseArray = (response, userCurrency) => {
  return (responseApi) => {
    if (responseApi.data.success) {
      response.push({
        name: responseApi.data.coin_name,
        price: responseApi.data.last_price,
        source: responseApi.data.source
      })
    }
  }
}

module.exports = {
  isValid,
  createOne,
  findAllByUser,
  getDataCryptocurrency,
  orderListbyPrice
}
