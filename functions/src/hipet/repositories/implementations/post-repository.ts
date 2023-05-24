import { PostRepository } from '../interfaces'
import { PostDTO } from '../models'
import { MongoClient } from 'mongodb'
import env from '../../../main/env'

const collectionName = 'Post'
const dbName = 'hipet';
const mongoClient = MongoClient.connect(env.mongodb.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

export class MongoPostRepository implements PostRepository {

  async add (post: PostDTO): Promise<PostDTO> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      await db.collection(collectionName).insertOne(post)
      return await db.collection(collectionName).findOne({ _id: post._id })
    } catch (err) {
      return null
    }
  }

  async findPostBy (field: string, value: any): Promise<PostDTO> {
    const client = await mongoClient;
    const db = client.db(dbName);
    
    try {
      return await db.collection(collectionName).findOne({ [field]: value })    
    } catch (err) {
      return null
    }
  }

  async delete (postId: string): Promise<boolean> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      await db.collection(collectionName).remove({ _id: postId })
      return true  
    } catch (err) {
      return false
    }
  }

  async deleteAll (field: string, value: string): Promise<boolean> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      const filter = { [field]: value }
      await db.collection(collectionName).deleteMany(filter)
      return true  
    } catch (err) {
      return false
    }
  }

  async listBy (field: string, value: string): Promise<PostDTO[]> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      const filter = { [field]: value }
      return await db.collection(collectionName).find(filter).sort({ created_at: -1 }).toArray()
    } catch {
      return null
    }
  }

  async listAll (limit: number): Promise<PostDTO[]> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      return await db.collection(collectionName).find({}).limit(limit).sort({ created_at: -1 }).toArray()
    } catch {
      return null
    }
  }
}
