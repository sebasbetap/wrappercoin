
const db = require('../repository')
const config = require('../config')
const jwt = require('../helpers/jwt')

const getUser = async (username) => {
  const { User } = await db(config.db)
  return User.getByUsername(username)
}

const getByPk = async (id) => {
  const { User } = await db(config.db)
  return User.getByPk(id)
}

const createOne = async (userFields) => {
  const { User } = await db(config.db)
  const user = await User.createOne(userFields)
  return user
}

const generateToken = (user) => {
  return jwt.sign({ username: user.username, id: user.id }, config.auth.secret)
}

module.exports = {
  getUser,
  createOne,
  generateToken,
  getByPk
}
