import { UserRepository } from '../../../hipet/repositories/interfaces'
import { CryptographService, StorageService } from '../../../hipet/services/interfaces'
import { UpdateUserResultStatusOptions, UpdateUserUseCaseInterface } from '../../../hipet/usecases/interfaces'
import { User } from '../../../hipet/schemata/entities'
import { UpdateUserUseCase } from '../../../hipet/usecases/implementations'
import { UserRepositoryStub } from '../../mocks/repositories'
import { CryptographServiceStub, StorageServiceStub } from '../../mocks/services'

interface SutTypes {
  sut: UpdateUserUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
  storageServiceStub: StorageService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()
  const storageServiceStub = new StorageServiceStub()

  const sut = new UpdateUserUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub, storageService: storageServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub,
    storageServiceStub
  }
}

const makeUserRequest = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'any_name',
  email: 'any_mail@mail.com',
  nickname: 'any_nickname',
  phone_number: '(00) 00000-0000',
  password: 'any_password',
  picture: 'any_picture_in_base64'
}

describe('User - Use Case', () => {
  describe('Update User', () => {
    test('Should return UNIQUE_KEY_FIELD if any primary key is already used', async () => {
      const { sut } = makeSut()
      const updateUserResult = await sut.update(makeUserRequest)

      expect(updateUserResult).toEqual({
        status: UpdateUserResultStatusOptions.unique_key_field
      })
    })

    test('Should return USER_NOT_FOUND status if user doesnt exist', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName
      jest.spyOn(userRepositoryStub, 'updateBy').mockImplementationOnce(null)

      const DeleteUserResult = await sut.update(makeUserRequest)
      expect(DeleteUserResult).toEqual({
        status: UpdateUserResultStatusOptions.user_not_found
      })
    })

    test('Should return SUCCESS status and the correct data user - Person', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName
      const updateUserResult = await sut.update(makeUserRequest)

      expect(updateUserResult.status).toEqual(UpdateUserResultStatusOptions.success)
      expect(updateUserResult.user).toBeInstanceOf(User)
    })
  })
})
