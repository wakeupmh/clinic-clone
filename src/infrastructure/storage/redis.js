const Redis = require('ioredis')
const Bluebird = require('bluebird')
const { cache } = require('../../config')

let keyValueStore = null

module.exports = () => {
  return new Bluebird.Promise(resolve => {
    const { redisHost, redisPort, redisDb } = cache

    if (keyValueStore) {
      return resolve(keyValueStore)
    }

    keyValueStore = new Redis({ redisHost, redisPort, redisDb })
    return resolve(keyValueStore)
  })
}
