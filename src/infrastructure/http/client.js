const axios = require('axios')
const { dataProviderConfig } = require('../../config')

const factory = () => {
  const instance = axios.create({
    baseURL: 'xpto',
    headers: {
      'Content-type': 'application/json'
    }
  })

  instance.interceptors.request.use(config => {
    config.headers.apikey = dataProviderConfig.apikey

    return config
  })

  return instance
}

let request = null

if (!request) {
  request = factory()
}

module.exports = { request }
