const { createLogger, transports } = require('winston')
const { combineLogFormats } = require('./format-levels')

const createLog = scope => 
  createLogger({
    level: 'info',
    defaultMeta: {
      scope,
      projectLabel: 'iClinic 🩺'
    },
    exitOnError: false,
    transports: [
      new transports.Console({
        format: combineLogFormats()
      })
    ]
  })

module.exports = { createLog }
