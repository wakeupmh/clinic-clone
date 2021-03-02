/* eslint-disable no-undef */

const prescriptionRepository = require('../../src/prescription/repository')
const prescriptionPayloadMock = require('../mock/payload')
const repositoryMock = require('../mock/repository')

const makePrescriptiontDb = () => ({
  bootstrap: async () => new Promise(resolve => resolve()),
  sequelize: {
    transaction: async () => new Promise(resolve => resolve())
  },
  prescription: {
    create: async () =>
      await new Promise(resolve => resolve(repositoryMock.prescription))
  }
})

const sutFactory = () => {
  const Logger = {
    info: jest.fn(),
    error: jest.fn()
  }

  const database = makePrescriptiontDb()
  const prescriptionRepositoryFn = prescriptionRepository({
    database,
    Logger
  })
  return {
    sut: prescriptionRepositoryFn,
    database
  }
}

describe('Prescription repository', () => {
  describe('Instrumentation methods', () => {
    it('should bootstrap the database', async () => {
      const { sut, database } = sutFactory()

      const bootstrapSpy = jest.spyOn(database, 'bootstrap')

      await sut.bootstrap()

      expect(bootstrapSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Prescription repository methods', () => {
    it('should create a prescription', async () => {
      const { sut, database } = sutFactory()

      jest.spyOn(database.sequelize, 'transaction')
        .mockImplementationOnce(payload => {
          payload()
          return Promise.resolve()
        })

      jest.spyOn(database.prescription, 'create')
        .mockReturnValueOnce(repositoryMock.prescription)

      await sut
        .transactionCreateRoundTrip(prescriptionPayloadMock.prescrtiptionPaylaod)

      expect(database.sequelize.transaction).toHaveBeenCalledTimes(1)
      expect(database.prescription.create).toHaveBeenCalledTimes(1)
    })
  })
})
