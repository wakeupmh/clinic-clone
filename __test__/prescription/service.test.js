/* eslint-disable no-undef */
const Bluebird = require('bluebird')
const {
  prescriptionServiceFactory,
  prescriptionPayloadMethods
} = require('../../src/prescription')

const payloadMock = require('../mock/payload')
const responseMock = require('../mock/response')

const sutFactory = () => {
  const Logger = {
    info: jest.fn(),
    error: jest.fn()
  }

  const prescriptionRepository = {
    bootstrap: () => Bluebird.resolve(),
    transactionCreateRoundTrip: jest.fn()
  }

  const dependentServices = {
    physiciansService: jest.fn(),
    patientsService: jest.fn(),
    clinicsService: jest.fn(),
    metricsService: jest.fn()
  }

  return {
    sut: prescriptionServiceFactory,
    prescriptionRepository,
    dependentServices,
    Logger
  }
}

describe('Prescription service tests', () => {
  it('should return a create a prescritpion', async () => {
    const {
      sut,
      prescriptionRepository,
      dependentServices,
      Logger
    } = sutFactory()

    jest.spyOn(prescriptionRepository, 'transactionCreateRoundTrip')
      .mockImplementationOnce(() => Bluebird.resolve())

    jest.spyOn(dependentServices, 'physiciansService')
      .mockImplementationOnce(() => Bluebird.resolve(responseMock.physician))

    jest.spyOn(dependentServices, 'patientsService')
      .mockImplementationOnce(() => Bluebird.resolve(responseMock.patient))

    jest.spyOn(dependentServices, 'clinicsService')
      .mockImplementationOnce(() => Bluebird.resolve(responseMock.clinic))

    jest.spyOn(dependentServices, 'metricsService')
      .mockImplementationOnce(() => Bluebird.resolve())

    const service = sut({
      prescriptionRepository,
      dependentServices,
      Logger,
      prescriptionPayloadMethods
    })

    await service.createPrescription(payloadMock.prescrtiptionPaylaod)

    expect(dependentServices.physiciansService).toHaveBeenCalledTimes(1)
    expect(dependentServices.clinicsService).toHaveBeenCalledTimes(1)
    expect(dependentServices.patientsService).toHaveBeenCalledTimes(1)
    expect(dependentServices.metricsService).toHaveBeenCalledTimes(1)
    expect(prescriptionRepository.transactionCreateRoundTrip).toHaveBeenCalledTimes(1)
    expect(Logger.info).toHaveBeenCalledTimes(5)
  })

  it('should create a prescription without clinics information', async () => {
    const {
      sut,
      prescriptionRepository,
      dependentServices,
      Logger
    } = sutFactory()

    jest.spyOn(prescriptionRepository, 'transactionCreateRoundTrip')
      .mockImplementationOnce(() => Bluebird.resolve())

    jest.spyOn(dependentServices, 'physiciansService')
      .mockImplementationOnce(() => Bluebird.resolve(responseMock.physician))

    jest.spyOn(dependentServices, 'patientsService')
      .mockImplementationOnce(() => Bluebird.resolve(responseMock.patient))

    jest.spyOn(dependentServices, 'clinicsService')
      .mockImplementationOnce(() => Bluebird.reject(null))

    jest.spyOn(dependentServices, 'metricsService')
      .mockImplementationOnce(() => Bluebird.resolve())

    const service = sut({
      prescriptionRepository,
      dependentServices,
      Logger,
      prescriptionPayloadMethods
    })

    await service.createPrescription(payloadMock.prescrtiptionPaylaod)

    expect(dependentServices.physiciansService).toHaveBeenCalledTimes(1)
    expect(dependentServices.clinicsService).toHaveBeenCalledTimes(1)
    expect(dependentServices.patientsService).toHaveBeenCalledTimes(1)
    expect(dependentServices.metricsService).toHaveBeenCalledTimes(1)
    expect(prescriptionRepository.transactionCreateRoundTrip).toHaveBeenCalledTimes(1)
    expect(Logger.info).toHaveBeenCalledTimes(5)
  })
})
