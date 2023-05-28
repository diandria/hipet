import { StorageService } from '../../../hipet/services/interfaces'

export class StorageServiceStub implements StorageService {
  async saveImg (base64Image: string, imageName: string, path: string): Promise<string> {
    const fileName = `${path}/${imageName}.png`
    const publicUrl = `https://storage.googleapis.com/bucket_name/${fileName}`
    return publicUrl
  }

  async deleteImg (imageName: string, path: string): Promise<boolean> {
    return true
  }
}
