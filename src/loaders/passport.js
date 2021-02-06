const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const userService = require('../services/user')
const { ErrorHandler } = require('../helpers/error')

passport.use(new BasicStrategy(async (username, password, done) => {
  const user = await userService.getUser(username)
  if (!user) return done(new ErrorHandler(401, 'Incorrect user or password'), false)

  const isCorrectPassword = user.correctPassword(password)
  isCorrectPassword ? done(null, user) : done(new ErrorHandler(401, 'Incorrect user or password'), false)
}))
