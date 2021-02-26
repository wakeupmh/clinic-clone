const { apm } = require('../../infrastructure')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const compression = require('compression')

const { resolve } = require('path')
const { useControllers } = require('express-decorator-router')
const {
  errorHandler,
  notFoundHandler,
  validationErrorHandler,
  schemaValidation
} = require('./middlewares')

const app = express()
const router = express.Router()

app.use(cors())
app.use(helmet())
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/v2', useControllers({
  router,
  controllerExpression: `${resolve('src')}/**/controller.js`
}))

app.use(schemaValidation)
app.use(notFoundHandler)
app.use(validationErrorHandler)

app.use(apm.middleware.connect())

app.use(errorHandler)

module.exports = { app }
