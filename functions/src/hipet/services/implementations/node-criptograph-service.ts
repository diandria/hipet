import { CryptographService } from '../interfaces'

export class NodeCryptographService implements CryptographService {
  encrypt (decodedValue: string): string {
    return Buffer.from(decodedValue, 'binary').toString('base64')
  }

  decrypt (encodedValue: string): string {
    return Buffer.from(encodedValue, 'base64').toString('binary')
  }
}
