module.exports = {
  ...require('./logging'),
  ...require('./server/middlewares'),
  ...require('./http'),
  iclinicDb: require('./storage/db'),
  redis: require('./storage/redis')
}
