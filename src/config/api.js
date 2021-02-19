const apiConfig = Object.freeze({
  port: process.env.port || 3001,
  maxBytesThreshold: process.env.maxBytesThreshold || 5242880,
  concurrencyThreshold: process.env.concurrencyThreshold || 100,
  apmServiceName: process.env.apmServiceName,
  apmServerUrl: process.env.apmServerUrl,
  apmSecretToken: process.env.apmSecretToken,
  apmActive: process.env.environment === 'prd',
  environment: process.env.environment
})

module.exports = { apiConfig }
