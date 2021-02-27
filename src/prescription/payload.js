const metricsPayload = body => ({
  physiciansResponse,
  patientsResponse,
  clinicsResponse
}) => ({
  clinic_id: body.clinic.id,
  clinic_name: clinicsResponse ? clinicsResponse.name : '',
  physician_id: body.physician.id,
  physician_name: physiciansResponse.name,
  physician_crm: physiciansResponse.crm,
  patient_id: body.patient.id,
  patient_name: patientsResponse.name,
  patient_email: patientsResponse.email,
  patient_phone: patientsResponse.phone
})

module.exports = {
  metricsPayload
}