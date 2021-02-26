const apiConfig = Object.freeze({
  port: process.env.PORT || 3001,
  apmServiceName: process.env.APM_SERVICE_NAME,
  apmServerUrl: process.env.APM_SERVER_URL,
  apmActive: process.env.ENV === 'dev',
  environment: process.env.ENV,
  physiciansToken: process.env.PHYSICIANS_TOKEN,
  physiciansRetryTimes: process.env.PHYSICIANS_RETRY_TIMES,
  physiciansTimeout: process.env.PHYSICIANS_TIMEOUT,
  clinicsToken: process.env.CLINICS_TOKEN,
  clinicsRetryTimes: process.env.CLINICS_RETRY_TIMES,
  clinicsTimeout: process.env.CLINICS_TIMEOUT,
  patientsToken: process.env.PATIENTS_TOKEN,
  patientsRetryTimes: process.env.PATIENTS_RETRY_TIMES,
  patientsTimeout: process.env.PATIENTS_TIMEOUT,
  metricsToken: process.env.METRICS_TOKEN,
  metricsRetryTimes: process.env.METRICS_RETRY_TIMES
})

module.exports = { apiConfig }
