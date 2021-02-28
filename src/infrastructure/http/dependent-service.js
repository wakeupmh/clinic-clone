const client = require('./client')
const errorStrategy = require('./error-strategy')

const errorCodes = scope => {
  const codes = {
    metrics: () => ({
      timeout: '04'
    }),
    physicians: () => ({
      timeout: '05',
      notFound: '02'
    }),
    patients: () => ({
      timeout: '06',
      notFound: '01'
    })
  }

  return codes[scope]
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
        .catch(error => errorStrategy(error, 'physician', errorCodes('physician')))

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
        .catch(error => errorStrategy(error, 'patients', errorCodes('patients')))

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
        .catch(error => errorStrategy(error, 'metrics', errorCodes('metrics')))

    return cacheStrategy(key, handler, apiConfig.metricsTtl)
  }

  return {
    physiciansService,
    clinicsService,
    patientsService,
    metricsService
  }
}
