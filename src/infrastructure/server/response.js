const createSimpleReponse = (statusCode, response) => message => response.status(statusCode).json(message)
const notFoundResponse = response => message => response.status(404).json(message)
const conflictResponse = response => message => response.status(409).json(message)

const handleResponse = response => outputPayload => {
  if (outputPayload) {
    return createSimpleReponse(200, response)(outputPayload)
  }

  return notFoundResponse(response)({
    message: 'Not found partner'
  })
}

const handleCreatedResponse = response => outputPayload => {
  if (outputPayload) {
    return createSimpleReponse(201, response)(outputPayload)
  }

  return conflictResponse(response)({
    message: 'Partner already exists'
  })
}

module.exports = {
  handleResponse
}