const client = require('./client')

const timeoutCodes = scope => {
  const codes = {
    metrics: () => '04',
    physicians: () => '05',
    patients: () => '06'
  }

  return codes[scope]
}

const errorStrategy = (error, scope, code) => {
  if (error.code === 'ECONNABORTED') {
    const timeoutError = new Error(`Timeout ${scope} service`)
    timeoutError.timeoutCode = code
    timeoutError.scope = scope

    throw timeoutError
  }

  throw error
}

module.exports = ({
  apiConfig,
  Logger,
  cacheClient
}) => {
  const cacheStrategy = (key, handler) =>
    cacheClient.get(key)
      .then(cachedData =>
        cachedData || cacheClient.fetchData(handler, key, apiConfig.patientsTtl)
      )

  const physiciansService = idPatient => {
    const key = `physicians#${idPatient}`
    const handler = () =>
      client({
        scope: 'physiciansService',
        Logger,
        timeout: apiConfig.physiciansTimeout,
        token: apiConfig.physiciansToken,
        retryTimes: apiConfig.physiciansRetryTimes
      })
        .get(`/physician/${idPatient}`)
        .catch(error => errorStrategy(error, 'physician', timeoutCodes('physician')))

    return cacheStrategy(key, handler, apiConfig.physiciansTtl)
  }

  const clinicsService = idPatient => {
    const key = `clinics#${idPatient}`
    const handler = () =>
      client({
        scope: 'clinicsService',
        Logger,
        timeout: apiConfig.clinicsTimeout,
        token: apiConfig.clinicsToken,
        retryTimes: apiConfig.clinicsRetryTimes
      })
        .get(`/clinics/${idPatient}`)
        .catch(() => Promise.resolve())

    return cacheStrategy(key, handler, apiConfig.clinicsTtl)
  }

  const patientsService = idPatient => {
    const key = `patients#${idPatient}`
    const handler = () =>
      client({
        scope: 'patientsService',
        Logger,
        timeout: apiConfig.patientsTimeout,
        token: apiConfig.patientsToken,
        retryTimes: apiConfig.patientsRetryTimes
      })
        .get(`/patients/${idPatient}`)
        .catch(error => errorStrategy(error, 'patients', timeoutCodes('patients')))

    return cacheStrategy(key, handler, apiConfig.patientsTtl)
  }

  const metricsService = payload => {
    const key = `metrics#${payload.patient_id}`
    const handler = () =>
      client({
        scope: 'metricsService',
        Logger,
        token: apiConfig.metricsToken,
        retryTimes: apiConfig.metricsRetryTimes
      })
        .post('metrics', payload)
        .catch(error => errorStrategy(error, 'metrics', timeoutCodes('metrics')))

    return cacheStrategy(key, handler, apiConfig.metricsTtl)
  }

  return {
    physiciansService,
    clinicsService,
    patientsService,
    metricsService
  }
}
