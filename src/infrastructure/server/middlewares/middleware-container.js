const {
  apiConfig
} = require('../../../config')

const {
  createLog,
  database,
  dependentServiceFactory,
  cacheClient
} = require('../../../infrastructure')

const {
  prescriptionServiceFactory,
  prescriptionPayloadMethods,
  prescriptionRepository
} = require('../../../prescription')

const prescriptionMiddlewareInjector = (req, _, next) => {
  const dependentServices = dependentServiceFactory({
    Logger: createLog('dependentServices'),
    cacheClient,
    apiConfig
  })
  
  const {
    createPrescription
  } = prescriptionServiceFactory({
    Logger: createLog('prescription'),
    dependentServices,
    prescriptionRepository,
    prescriptionPayloadMethods
  })

  req.createPrescription = createPrescription

  next()
}

module.exports = {
  prescriptionMiddlewareInjector
}
