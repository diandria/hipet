import { ApresentationUseCases } from '../../../hipet/usecases/implementations'
import { ApresentationUseCasesInterface } from '../../../hipet/usecases/interfaces'

interface SutTypes {
  sut: ApresentationUseCasesInterface
}

const makeSut = (): SutTypes => {
  const sut = new ApresentationUseCases()
  return {
    sut
  }
}

describe('Apresentation - Use Case', () => {
  describe('Get Version', () => {
    test('Should return correct data', async () => {
      const { sut } = makeSut()

      const getVersionResult = await sut.getVersion()
      expect(getVersionResult).toEqual({
        status: 'SUCCESS',
        version: '2.0.0',
        description: 'API para o sistema HIPET'
      })
    })
  })
})
