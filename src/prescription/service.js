module.exports = ({
  Logger,
  dependentServices,
  prescriptionRepository,
  prescriptionPayloadMethods
}) => {
  const createPrescription = body => {
    return prescriptionRepository.bootstrap()
      .then(() => dependentServices.physiciansService(body.physician.id))
      .tap(physiciansResponse => {
        Logger.info(`Physicians services returns - ${physiciansResponse}`)
      })
      .then(physiciansResponse =>
        Promise.all([
          physiciansResponse,
          dependentServices.patientsService(body.patient.id)
        ])
      )
      .tap(([, patientsResponse]) => {
        Logger.info(`Patients services returns - ${patientsResponse}`)
      })
      .then(([physiciansResponse, patientsResponse]) => {
        return dependentServices.clinicsService(body.clinic.id)
          .then(clinicsResponse => ({
            physiciansResponse,
            patientsResponse,
            clinicsResponse
          }))
          .tap(({ clinicsResponse }) => {
            Logger.info(`Clinics services returns - ${clinicsResponse}`)
          })
          .catch(() => {
            Logger.info('Clinics service response does not returned value')
            return {
              physiciansResponse,
              patientsResponse,
              clinicsResponse: null
            }
          })
      })
      .then(prescriptionPayloadMethods.metricsPayload(body))
      .tap(metricsPayload => {
        Logger.info(`Metrics payload mounted - ${metricsPayload}`)
      })
      .then(dependentServices.metricsService)
      .tap(() => {
        Logger.info('Metrics successfully sended')
      })
      .then(() => prescriptionRepository.transactionCreateRoundTrip(body))
  }

  return {
    createPrescription
  }
}
