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
  prescriptionRepositoryFactory
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
    Logger: createLog('prescriptionService'),
    dependentServices,
    prescriptionRepository: prescriptionRepositoryFactory({
      Logger: createLog('prescriptionRepository'),
      database
    }),
    prescriptionPayloadMethods
  })

  req.createPrescription = createPrescription

  next()
}

module.exports = {
  prescriptionMiddlewareInjector
}
