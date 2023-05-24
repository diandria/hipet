export interface CryptographService {
  encrypt (decodedValue: string): string
  decrypt (encodedValue: string): string
}
