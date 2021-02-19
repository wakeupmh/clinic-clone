const Redis = require('ioredis')
const Bluebird = require('bluebird')
const { cache } = require('../../config')

let keyValueStore = null

module.exports = () => {
  return new Bluebird.Promise(resolve => {
    const { host, port, db, password, tls } = cache
    if (keyValueStore) {
      return resolve(keyValueStore)
    }
    keyValueStore = new Redis({ host, port, db, password, tls })
    return resolve(keyValueStore)
  })
}
