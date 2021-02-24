const Bluebird = require('bluebird')

const prescriptionRepository = ({ Logger, database }) => {
  const bootstrap = () => database.bootstrap()

  const transactionCreateRoundTrip = payload =>
    database.sequelize.transaction(transactionInstance =>
      Bluebird.resolve(transactionInstance)
        .then(transaction => database.prescription.create(payload, { transaction })))
        .tap(() => {
          Logger.info('Prescription created')
        })
        .catch(err => {
          Logger.error(`Prescription creation has encountred an error - ${JSON.stringify(err)}`)
          throw err
        })
  
  return {
    bootstrap,
    transactionCreateRoundTrip
  }
}

module.exports = prescriptionRepository
