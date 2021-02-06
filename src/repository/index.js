const setupDatabase = require('./db')
const setupUserModel = require('../models/users')
const setupCryptocurrenciesModel = require('../models/cryptocurrency')
const setupUser = require('./users')
const setupCryptocurrencies = require('./cryptocurrency')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)
  const CryptocurrenciesModel = setupCryptocurrenciesModel(config)

  UserModel.hasMany(CryptocurrenciesModel)
  CryptocurrenciesModel.belongsTo(UserModel)
  await sequelize.authenticate()
  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = setupUser(UserModel)
  const Cryptocurrencies = setupCryptocurrencies(CryptocurrenciesModel)

  return {
    User,
    Cryptocurrencies
  }
}
