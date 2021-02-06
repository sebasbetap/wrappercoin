module.exports = function setupCryptocurrencies (CryptocurrenciesModel) {
  const createOne = (userId, currencyParams) => {
    return CryptocurrenciesModel.create(
      {
        userId,
        name: currencyParams.name
      })
  }

  const findAllByUser = (userId) => {
    return CryptocurrenciesModel.findAll({
      where: {
        userId
      }
    })
  }

  return {
    createOne,
    findAllByUser
  }
}
