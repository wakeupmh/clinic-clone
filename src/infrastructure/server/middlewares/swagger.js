const swaggerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { swagger } = require('../../../config')

const useSwaggerDocs = router => {
  const swaggerConf = {
    ...swagger,
    apis: ['./**/controller.js']
  }

  const options = {
    customSiteTitle: 'iClinic API - Documentation',
    showExplorer: true
  }

  router.use('/docs', swaggerUi.serve)
  router.get('/docs', swaggerUi.setup(swaggerDoc(swaggerConf), options))

  return router
}

module.exports = {
  useSwaggerDocs
}
