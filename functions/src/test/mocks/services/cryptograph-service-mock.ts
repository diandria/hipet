import { CryptographService } from '../../../hipet/services/interfaces'

export class CryptographServiceStub implements CryptographService {
  encrypt (decodedValue: string): string {
    return 'any_encoded_value'
  }

  decrypt (encodedValue: string): string {
    return 'any_decoded_value'
  }
}
