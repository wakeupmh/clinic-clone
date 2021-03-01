/* eslint-disable no-undef */

const cacheFactory = require('../../src/infrastructure/http/cache')
const responseMock = require('../mock/response')

const sutFactory = () => {
  const redisClient = Promise.resolve({
    get: jest.fn(),
    set: jest.fn()
  })
  const redis = () => redisClient
  const Logger = {
    info: jest.fn()
  }
  const cacheClient = cacheFactory({
    redis,
    Logger
  })
  return {
    sut: cacheClient,
    redis,
    Logger
  }
}

describe('Http cache tests', () => {
  it('should not throw error when the cache fails', async () => {
    const { sut, redis, Logger } = sutFactory()
    const client = await redis()
    client.get.mockImplementation(() => { throw new Error() })

    await sut.get(null)
    expect(Logger.info).toBeCalledWith(expect.stringMatching(/Error/ig))
  })

  it('should return a cached information', async () => {
    const { sut, redis } = sutFactory()
    const client = await redis()

    client.get
      .mockImplementation(() => Promise.resolve(JSON.stringify(responseMock.physician)))
    const cacheFn = await sut.get('physician#1')

    expect(client.get).toHaveBeenCalledTimes(1)
    expect(cacheFn).toStrictEqual(responseMock.physician)
  })

  it('should return a null value to cached information', async () => {
    const { sut, redis } = sutFactory()
    const client = await redis()

    client.get
      .mockImplementation(() => Promise.resolve(null))
    const cacheFn = await sut.get('physician#1')

    expect(client.get).toHaveBeenCalledTimes(1)
    expect(cacheFn).toStrictEqual(null)
  })

  it('should fetch data into cache', async () => {
    const { sut, redis } = sutFactory()
    const client = await redis()
    const handlerFn = () => Promise.resolve(responseMock.physician)

    await sut.fetchData(handlerFn, expect.anything(), expect.anything())
    expect(client.set).toHaveBeenCalledWith(
      expect.anything(),
      JSON.stringify(responseMock.physician),
      'EX',
      expect.anything()
    )
  })
})
