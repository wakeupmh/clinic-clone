const axios = require('axios')
const retryAxios = require('retry-axios')
const {
  apiConfig
} = require('../../config')

module.exports = ({
  token,
  retryTimes,
  Logger,
  scope,
  timeout
}) => {
  const axiosInstance = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  axios.defaults.timeout = timeout

  axiosInstance.defaults.raxConfig = {
    instance: axiosInstance,
    retry: retryTimes,
    noResponseRetries: retryTimes,
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'POST'],
    onRetryAttempt: err => {
      const cfg = retryAxios.getConfig(err)
      Logger.warn(`${scope} - Retry attempt #${cfg.currentRetryAttempt}`)
    }
  }

  retryAxios.attach(axiosInstance)

  return axiosInstance
}
