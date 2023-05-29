import { UserRepository } from '../../../hipet/repositories/interfaces'
import { CryptographService } from '../../../hipet/services/interfaces'
import { FindUserByIdResultStatusOptions, FindUserByIdUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { FindUserByIdUseCase } from '../../../hipet/usecases/implementations'
import { UserRepositoryStub } from '../../mocks/repositories'
import { CryptographServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: FindUserByIdUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()

  const sut = new FindUserByIdUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub
  }
}

const makeUserRequest = {
  id: '00000000-0000-0000-0000-000000000000'
}

describe('User - Use Case', () => {
  describe('Find User By ID', () => {
    test('Should return USER_NOT_FOUND status if user doesnt exist', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null)

      const FindUserByIdResult = await sut.find(makeUserRequest)
      expect(FindUserByIdResult).toEqual({
        status: FindUserByIdResultStatusOptions.user_not_found
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut } = makeSut()
      const FindUserByIdResult = await sut.find(makeUserRequest)

      expect(FindUserByIdResult.status).toEqual(FindUserByIdResultStatusOptions.success)
    })
  })
})
