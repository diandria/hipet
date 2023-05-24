export interface StorageService {
  saveImg: (base64Image: string, imageName: string, path: string) => Promise<string>
  deleteImg: (imageName: string, path: string) => Promise<boolean>
}
