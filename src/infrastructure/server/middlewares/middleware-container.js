const { createLog, database } = require('../../../infrastructure')
const {
  partnerServiceFactory
} = require('../../../prescription')

const prescriptionMiddlewareInjector = (req, _, next) => {
  const {
    createPrescription
  } = partnerServiceFactory({
    database,
    Logger: createLog('prescription')
  })

  req.createPrescription = createPrescription

  next()
}

module.exports = {
  prescriptionMiddlewareInjector
}
