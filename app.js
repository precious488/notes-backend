const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const notesRouter = require('./controllers/notes.js')

const app = express()

logger.info('connecting to', config.MONGODB_URL)
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connection to mongoDb:', error.message)
  })
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
