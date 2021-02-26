const { apmServiceName, apmServerUrl } = require('../../infrastructure')

const apm = require('elastic-apm-node').start({
  serviceName: apmServiceName,
  serverUrl: apmServerUrl
})

module.exports {
  apm
}
