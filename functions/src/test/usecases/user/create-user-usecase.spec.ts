import { UserRepository } from '../../../hipet/repositories/interfaces'
import { CryptographService, StorageService, UuidService } from '../../../hipet/services/interfaces'
import { CreateUserResultStatusOptions, CreateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { User } from '../../../hipet/schemata/entities'
import { CreateUserUseCase } from '../../../hipet/usecases/implementations'
import { UserRepositoryStub } from '../../mocks/repositories'
import { CryptographServiceStub, StorageServiceStub, UuidServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: CreateUserUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
  storageServiceStub: StorageService
  uuidServiceStub: UuidService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()
  const storageServiceStub = new StorageServiceStub()
  const uuidServiceStub = new UuidServiceStub()

  const sut = new CreateUserUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub, storageService: storageServiceStub, uuidService: uuidServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub,
    storageServiceStub,
    uuidServiceStub
  }
}

const makeUserRequest = {
  type: 'PERSON',
  name: 'any_name',
  email: 'any_mail@mail.com',
  nickname: 'any_nickname',
  phone_number: '(00) 00000-0000',
  password: 'any_password',
  document: '123.456.789-00',
  picture: 'any_picture_in_base64'
}

describe('User - Use Case', () => {
  describe('Create User', () => {
    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName

      jest.spyOn(userRepositoryStub, 'add').mockImplementationOnce(async () => null) // throw

      const createUserResult = await sut.create(makeUserRequest)
      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.repository_error
      })
    })

    test('Should return UNIQUE_KEY_FIELD if any primary key is already used', async () => {
      const { sut } = makeSut()
      const createUserResult = await sut.create(makeUserRequest)

      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.unique_key_field
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName
      const createUserResult = await sut.create(makeUserRequest)

      expect(createUserResult.status).toEqual(CreateUserResultStatusOptions.success)
      expect(createUserResult.user).toBeInstanceOf(User)
    })
  })
})
