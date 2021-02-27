const { controller, post } = require('express-decorator-router')
const { prescriptionMiddlewareInjector } = require('../infrastructure')
const { handleCreatedResponse } = require('../infrastructure')
const { createPrescriptionSchema } = require('./schema')

/**
 * @swagger
 * /v2/prescription:
 *   post:
 *     tags:
 *      - Prescriptions
 *     summary:
 *       Medical prescription service
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: json
 *         name: Prescriptions
 *         type: json
 *         description: Insert new prescriptions.
 *     responses:
 *       201:
 *         description: Returns created Prescription
 *       400:
 *         description: Returns error
 */
const createPrescription = ({ request, response }) => {
  const { body, createPrescription } = request

  return Promise.resolve(body)
    .then(createPrescription)
    .then(handleCreatedResponse(response))
}

module.exports = controller('/prescriptions', prescriptionMiddlewareInjector)({
  createPrescription
}, {
  createPrescription: post(createPrescriptionSchema)
})
