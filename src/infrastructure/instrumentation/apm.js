const { apiConfig } = require('../../infrastructure')

const apm = require('elastic-apm-node').start({
  serviceName: apiConfig.apmServiceName,
  serverUrl: apiConfig.apmServerUrl,
  active: apiConfig.apmActive,
  environment: apiConfig.environment,
  ignoreUrls: ['/healthcheck']
})

module.exports = {
  apm
}
