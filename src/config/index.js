module.exports = {
  iclinicDb: require('./database'),
  ...require('./api'),
  ...require('./swagger')
}
