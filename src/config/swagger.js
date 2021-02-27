const swagger = Object.freeze({
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      description: 'Api to prescription',
      version: '1.0.0',
      title: 'iClinic API'
    },
    basePath: 'v2',
    schemes: ['http', 'https']
  }
})

module.exports = {
  swagger
}
