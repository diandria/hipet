import { UserRepository } from '../../../hipet/repositories/interfaces'
import { CryptographService } from '../../../hipet/services/interfaces'
import { FindUserByNicknameResultStatusOptions, FindUserByNicknameUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { FindUserByNicknameUseCase } from '../../../hipet/usecases/implementations'
import { UserRepositoryStub } from '../../mocks/repositories'
import { CryptographServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: FindUserByNicknameUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()

  const sut = new FindUserByNicknameUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub
  }
}

const makeUserRequest = {
  nickname: 'any_nickname'
}

describe('User - Use Case', () => {
  describe('Find User By Nickname', () => {
    test('Should return USER_NOT_FOUND status if user doesnt exist', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null)

      const FindUserByNicknameResult = await sut.find(makeUserRequest)
      expect(FindUserByNicknameResult).toEqual({
        status: FindUserByNicknameResultStatusOptions.user_not_found
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut } = makeSut()
      const FindUserByNicknameResult = await sut.find(makeUserRequest)

      expect(FindUserByNicknameResult.status).toEqual(FindUserByNicknameResultStatusOptions.success)
    })
  })
})
