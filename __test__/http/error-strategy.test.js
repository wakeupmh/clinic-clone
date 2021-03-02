/* eslint-disable no-undef */

const errorStrategy = require('../../src/infrastructure/http/error-strategy')
describe('Http Error Strategy tests', () => {
  it('should throw a custom error to connection aborted', () => {
    const error = {
      code: 'ECONNABORTED'
    }
    const errorCodeType = {
      timeout: '05'
    }
    const scope = 'some scope'

    expect(() => {
      errorStrategy(error, scope, errorCodeType)
    })
      .toThrow(`Timeout ${scope} service`)
  })

  it('should throw a custom error to not found', () => {
    const error = {
      response: {
        status: 404
      }
    }
    const errorCodeType = {
      notFound: '01'
    }
    const scope = 'some scope'

    expect(() => {
      errorStrategy(error, scope, errorCodeType)
    })
      .toThrow(`Not Found ${scope}`)
  })

  it('should throw a custom error for connection aborted', () => {
    const error = new Error('some Error')
    const errorCodeType = null
    const scope = 'some scope'

    expect(() => {
      errorStrategy(error, scope, errorCodeType)
    })
      .toThrow('some Error')
  })
})
