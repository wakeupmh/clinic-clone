const physician = { id: '3', name: 'Miss Kenny Franecki', crm: '56e6b987-3963-462a-8d4f-3c7e0a8098b3' }
const clinic = { id: '3', name: 'Anibal Torp' }
const patient = { id: '3', name: 'Chester MacGyver', email: 'Antonette69@gmail.com', phone: '200.126.4051 x6710' }

const unformattedMetrics = {
  patientsResponse: patient,
  clinicsResponse: clinic,
  physiciansResponse: physician
}
module.exports = {
  physician,
  clinic,
  patient,
  unformattedMetrics
}
