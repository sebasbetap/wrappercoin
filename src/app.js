const express = require('express')
const config = require('./config')

const logger = require('./helpers/logger')

async function startServer () {
  const app = express()
  await require('./loaders')(app) // Start the loaders configuration

  app.listen(config.port, () => {
    logger.info(`Server started on the port ${config.port}`)
  })
}

startServer()
