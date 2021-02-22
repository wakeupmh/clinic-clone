const client = require('./client')

module.exports = ({
  apiConfig,
  Logger,
  cacheClient
}) => {
  const generateKey = (scope, id) => `${scope}#${key}`
  const cacheStrategy = (key, handler) => 
    cacheClient.get(key)
      .then(cachedData => 
        cachedData || cacheClient.fetchData(handler, key, apiConfig.patientsTtl)
      )

  const physiciansService = idPatient =>{
    const key = `physicians#${idPatient}`
    const handler = () => 
      client({
        token: apiConfig.physiciansToken,
        retryTimes: apiConfig.physiciansRetryTimes,
        scope: 'physiciansService',
        Logger
      })
        .get(`physician/${idPatient}`)
    
    return cacheStrategy(key, handler, apiConfig.physiciansTtl)
  }

  const clinicsService = idPatient => {
    const key = `clinics#${idPatient}`
    const handler = () => 
      client({
        token: apiConfig.clinicsToken,
        retryTimes: apiConfig.clinicsRetryTimes,
        scope: 'clinicsService',
        Logger
      })
        .get(`clinics/${idPatient}`)
    
    return cacheStrategy(key, handler, apiConfig.clinicsTtl)
  }

  const patientsService = idPatient => {
    const key = `patients#${idPatient}`
    const handler = () => 
      client({
        token: apiConfig.patientsToken,
        retryTimes: apiConfig.patientsRetryTimes,
        scope: 'patientsService',
        Logger
      })
        .get(`patients/${idPatient}`)

    return cacheStrategy(key, handler, apiConfig.patientsTtl)
  }

  const metricsService = payload => {
    const key = `metrics#${idPatient}`
    const handler = () => 
      client({
        token: apiConfig.metricsToken,
        retryTimes: apiConfig.metricsRetryTimes,
        scope: 'metricsService',
        Logger
      })
        .post(`patients/${idPatient}`, payload)
    
    return cacheStrategy(key, handler, apiConfig.metricsTtl)
  }

  return {
    physiciansService,
    clinicsService,
    patientsService,
    metricsService
  }
}
