import { StorageService } from '../interfaces'
import { Storage } from '@google-cloud/storage'
import { logger } from "firebase-functions";


export class GoogleStorageService implements StorageService {
  async saveImg (base64Image: string, imageName: string, path: string): Promise<string> {
    try {
      const storage = new Storage();
      let bucket = storage.bucket('hipet-67bd6.appspot.com');

      const buffer = Buffer.from(base64Image, 'base64');
      const fileName = `${path}/${imageName}.png`;
      const file = bucket.file(fileName);

      const [exists] = await file.exists();
      if (exists) await file.delete();

      const options = {
        metadata: {
          cacheControl: 'no-cache, max-age=0',
        },
      };

      await file.save(buffer, options);

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      return publicUrl
    } catch (error) {
      logger.log(error);
      return null
    }
  }

  async deleteImg (imageName: string, path: string): Promise<boolean> {
    try {
      const storage = new Storage();
      let bucket = storage.bucket('hipet-67bd6.appspot.com');

      const fileName = `${path}/${imageName}.png`;
      const file = bucket.file(fileName);

      const [exists] = await file.exists();
      if (!exists) return false
      
      await file.delete();

      return true
    } catch (error) {
      logger.log(error);
      return false
    }
  }
}
