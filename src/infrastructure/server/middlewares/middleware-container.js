const {
  createLog,
  database,
  dependentServiceFactory
} = require('../../../infrastructure')
const {
  prescriptionServiceFactory
} = require('../../../prescription')

const prescriptionMiddlewareInjector = (req, _, next) => {
  const dependentServices = dependentServiceFactory({
    Logger: createLog('dependentServices')
  })
  const {
    createPrescription
  } = prescriptionServiceFactory({
    database,
    Logger: createLog('prescription'),
    dependentServices
  })

  req.createPrescription = createPrescription

  next()
}

module.exports = {
  prescriptionMiddlewareInjector
}
