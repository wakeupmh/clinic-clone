const createSimpleReponse = (statusCode, response) => message => response.status(statusCode).json(message)
const notFoundResponse = response => message => response.status(404).json(message)
const conflictResponse = response => message => response.status(409).json(message)

const handleCreatedResponse = response => outputPayload => {
  if (outputPayload) {
    return createSimpleReponse(201, response)(outputPayload)
  }
}

module.exports = {
  handleResponse
}
