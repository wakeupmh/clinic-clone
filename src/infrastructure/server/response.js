const createSimpleReponse = (statusCode, response) =>
  message => response.status(statusCode).json(message)

const notFoundResponse = response =>
  message => response.status(404).json(message)

const handleCreatedResponse = response =>
  outputPayload => createSimpleReponse(201, response)(outputPayload)

module.exports = {
  handleCreatedResponse,
  notFoundResponse
}
