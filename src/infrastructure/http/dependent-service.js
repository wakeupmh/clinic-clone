const client = require('./client')
const {
  apiConfig
} = require('../../config')

module.exports = ({
  Logger
}) => {
  const physiciansService = idPatient =>
    client({
      token: apiConfig.physiciansToken,
      retryTimes: apiConfig.physiciansRetryTimes,
      scope: 'physiciansService',
      Logger
    })
    .get(`physician/${idPatient}`)

  const clinicsService = idPatient =>
    client({
      token: apiConfig.clinicsToken,
      retryTimes: apiConfig.clinicsRetryTimes,
      scope: 'clinicsService',
      Logger
    })
    .get(`clinics/${idPatient}`)

  const patientsService = idPatient =>
    client({
      token: apiConfig.patientsToken,
      retryTimes: apiConfig.patientsRetryTimes,
      scope: 'patientsService',
      Logger
    })
    .get(`patients/${idPatient}`)

  const metricsService = payload =>
    client({
      token: apiConfig.metricsToken,
      retryTimes: apiConfig.metricsRetryTimes,
      scope: 'metricsService',
      Logger
    })
    .post(`patients/${idPatient}`, payload)

  return {
    physiciansService,
    clinicsService,
    patientsService,
    metricsService
  }
}
