const apiConfig = Object.freeze({
  port: process.env.PORT || 3001,
  apmServiceName: process.env.APM_SERVICE_NAME,
  apmServerUrl: process.env.APM_SERVER_URL,
  apmSecretToken: process.env.APM_SECRET_TOKEN,
  apmActive: process.env.ENV === 'prd',
  environment: process.env.ENV,
  physiciansToken: process.env.PHYSICIANS_TOKEN,
  physiciansRetryTimes: process.env.PHYSICIANS_RETRY_TIMES,
  clinicsToken: process.env.CLINICS_TOKEN,
  clinicsRetryTimes: process.env.CLINICS_RETRY_TIMES,
  patientsToken: process.env.PATIENTS_TOKEN,
  patientsRetryTimes: process.env.PATIENTS_RETRY_TIMES,
  metricsToken: process.env.METRICS_TOKEN,
  metricsRetryTimes: process.env.METRICS_RETRY_TIMES
})

module.exports = { apiConfig }
