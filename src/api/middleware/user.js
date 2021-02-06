const userService = require('../../services/user')
const { ErrorHandler } = require('../../helpers/error')

const existUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.body.username)
    if (user) return next(new ErrorHandler(500, 'the user is already registered'))
    next()
  } catch (error) {
    next(error)
  }
}

const getOne = async (req, res, next) => {
  try {
    const user = await userService.getByPk(req.user.id)
    if (!user) return next(new ErrorHandler(500, 'user not found'))

    req.userRegistered = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  existUser,
  getOne
}
