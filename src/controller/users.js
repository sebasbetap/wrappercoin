const userService = require('../services/user')
const { ErrorHandler } = require('../helpers/error')

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createOne(req.body)
    if (!user) return next(new ErrorHandler(500, 'the user could not be created'))
    res.status(201).send('user created successfully')
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

const generateToken = (req, res, next) => {
  const token = userService.generateToken(req.user)
  res.json({ token })
}

module.exports = {
  createUser,
  generateToken
}
