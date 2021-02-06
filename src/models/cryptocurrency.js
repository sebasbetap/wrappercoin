const Sequelize = require('sequelize')
const setupDatabase = require('../repository/db')

const createSchema = sequelize => {
  return sequelize.define('cryptocurrencies', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'currencyIndex'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'currencyIndex'
    }
  })
}

module.exports = function setupCryptocurrencies (config) {
  const sequelize = setupDatabase(config)
  const Cryptocurrencies = createSchema(sequelize)

  return Cryptocurrencies
}
