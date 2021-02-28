module.exports = (error, scope, code) => {
  if (error.code === 'ECONNABORTED') {
    const timeoutError = new Error(`Timeout ${scope} service`)
    timeoutError.errorCodeType = code.timeout
    timeoutError.scope = scope
    timeoutError.customMessage = `${scope} service not available`

    throw timeoutError
  }

  if (error.response.status === 404) {
    const notFoundError = new Error(`Not Found ${scope}`)
    notFoundError.errorCodeType = code.notFound
    notFoundError.scope = scope
    notFoundError.customMessage = `${scope} not found`

    throw notFoundError
  }

  throw error
}
