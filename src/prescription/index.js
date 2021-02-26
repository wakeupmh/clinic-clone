module.exports = {
  prescriptionPayloadMethods: require('./payload'),
  prescriptionRepository: require('./repository'),
  prescriptionServiceFactory: require('./service'),
  ...require('./models/prescription'),
  ...require('./schema')
}
