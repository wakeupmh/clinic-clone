const Bluebird = require('bluebird')

const cache = ({ redis, Logger }) => {
  const get = key => redis().then(c => c.get(key))
    .then(data => JSON.parse(data || null))
    .catch(err => {
      Logger.info(`Error fetching credential from cache ${err}`)
    })

  const set = (key, data, ttl) =>
    redis().then(c => c.set(key, JSON.stringify(data), 'EX', ttl))

  const fetchData = (handler, key, ttl) => 
    Bluebird.resolve(handler())
      .tap(dataToCache => set(key, data, ttl))
      .tap(dataToCache => {
        Logger.info(`Data feteched with key: ${key} and ttl: ${ttl}`)
      })
    
  return {
    get,
    fetchData
  }
}

module.exports = cache
