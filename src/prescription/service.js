module.exports = ({
  Logger,
  dependentServices,
  prescriptionRepository,
  prescriptionPayloadMethods
}) => {
  const createPrescription = body => {
    return prescriptionRepository.bootstrap()
      .then(() => dependentServices.physiciansService(body.physician.id))
      .then(physiciansResponse =>
        Promise.all([
          physiciansResponse,
          dependentServices.patientsService(body.patient.id)
        ])
      )
      .then(([physiciansResponse, patientsResponse]) => {
        return dependentServices.clinicsService(body.clinic.id)
          .then(clinicsResponse => ({
            physiciansResponse,
            patientsResponse,
            clinicsResponse
          }))
          .catch(() => ({
            physiciansResponse,
            patientsResponse,
            clinicsResponse: null
          }))
      })
      .then(prescriptionPayloadMethods.metricsPayload(body))
      .then(dependentServices.metricsService)
      .then(() => prescriptionRepository.transactionCreateRoundTrip(body))
  }

  return {
    createPrescription
  }
}
