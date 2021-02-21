const cache = ({ redis, Logger }) => {
  const get = key => redis().then(c => c.get(key))
    .then(data => JSON.parse(data || null))
    .catch(err => {
      Logger.info(`Error fetching credential from cache ${err}`)
    })

  const set = (key, data, ttl) =>
    redis().then(c => c.set(key, JSON.stringify(data), 'EX', ttl))

  return {
    get,
    set
  }
}

module.exports = cache
