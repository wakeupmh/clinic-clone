module.exports = {
  prescriptionPayloadMethods: require('./payload'),
  prescriptionRepository: require('./repository'),
  prescriptionServiceFactory: require('./service'),
  ...require('./schema')
}