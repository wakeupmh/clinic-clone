/* eslint-disable no-template-curly-in-string */
const yup = require('yup')
const {
  setLocale
} = yup

setLocale({
  mixed: {
    notType: 'o ${path} é obrigatório',
    required: 'o campo ${path} é obrigatório'
  }
})

const idSchema = yup.object().shape({
  id: yup.number().required()
})

const createPrescriptionSchema = yup.object().shape({
  clinic: idSchema,
  physician: idSchema,
  patient: idSchema,
  text: yup.string()
})

module.exports = {
  createPrescriptionSchema
}
