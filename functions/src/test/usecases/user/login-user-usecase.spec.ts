import { UserRepository } from '../../../hipet/repositories/interfaces'
import { CryptographService, UuidService } from '../../../hipet/services/interfaces'
import { LoginUserResultStatusOptions, LoginUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { LoginUserUseCase } from '../../../hipet/usecases/implementations'
import { UserRepositoryStub } from '../../mocks/repositories'
import { CryptographServiceStub, UuidServiceStub } from '../../mocks/services'
import { SimpleUser } from '../../../hipet/schemata/entities'

interface SutTypes {
  sut: LoginUserUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
  uuidServiceStub: UuidService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()
  const uuidServiceStub = new UuidServiceStub()

  const sut = new LoginUserUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub, uuidService: uuidServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub,
    uuidServiceStub
  }
}

const makeUserRequest = {
  email: 'any_mail@mail.com',
  password: 'any_password'
}

describe('User - Use Case', () => {
  describe('Login User', () => {
    test('Should return UNIQUE_KEY_FIELD if any primary key is already used', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      const updateUserResult = await sut.authenticate(makeUserRequest)

      expect(updateUserResult).toEqual({
        status: LoginUserResultStatusOptions.user_not_found
      })
    })

    test('Should return WRONG_PASSWORRD if password is different than save', async () => {
      const { sut, cryptographServiceStub } = makeSut()
      jest.spyOn(cryptographServiceStub, 'decrypt').mockImplementationOnce(() => {
        return 'other_password'
      })
      const updateUserResult = await sut.authenticate(makeUserRequest)

      expect(updateUserResult.status).toEqual(LoginUserResultStatusOptions.wrong_password)
    })

    test('Should return SUCCESS status', async () => {
      const { sut, cryptographServiceStub } = makeSut()
      jest.spyOn(cryptographServiceStub, 'decrypt').mockImplementationOnce(() => {
        return 'any_password'
      })
      const updateUserResult = await sut.authenticate(makeUserRequest)
      expect(updateUserResult.status).toEqual(LoginUserResultStatusOptions.success)
      expect(updateUserResult.user).toBeInstanceOf(SimpleUser)
    })
  })
})
