const { controller, post } = require('express-decorator-router')
const { prescriptionMiddlewareInjector } = require('../infrastructure')
const { handleCreatedResponse } = require('../infrastructure')
const { createPrescriptionSchema } = require('./schema')

const createPrescription = ({ request, response }) => {
  const { body, createPrescription } = request

  return Promise.resolve(body)
    .then(createPrescription)
    .then(handleCreatedResponse(response))
}

module.exports = controller('/partner', prescriptionMiddlewareInjector)({
  createPrescription
}, {
  createPrescription: post(schemaValidation(createPrescriptionSchema))
})
