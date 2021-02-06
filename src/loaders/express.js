const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const routes = require('../api')
const { handleError } = require('../helpers/error')

module.exports = async (app) => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(passport.initialize())

  app.get('/status', (req, res) => { // Path to know the status of the server
    res.status(200).end()
  })
  app.use('/', routes())
  app.use((err, req, res, next) => {
    handleError(err, res)
  })
}
