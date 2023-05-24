import { UserRepository } from '../interfaces/user-repository-interface'
import { UserDTO } from '../models'
import { MongoClient } from 'mongodb';
import env from '../../../main/env'

const collectionName = 'User'
const dbName = 'hipet';
const mongoClient = MongoClient.connect(env.mongodb.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

export class MongoUserRepository implements UserRepository {
  async add (user: UserDTO): Promise<UserDTO> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      await db.collection(collectionName).insertOne(user)
      return await db.collection(collectionName).findOne({ _id: user._id })
    } catch (err) {
      return null
    }
  }

  async findUserBy (field: string, value: any): Promise<UserDTO> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      return await db.collection(collectionName).findOne({ [field]: value })
    } catch (error) {
      return null
    }
  }

  async delete (customerId: string): Promise<boolean> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      await db.collection(collectionName).remove({ _id: customerId })
      return true  
    } catch (err) {
      return false
    }
  }

  async updateBy (field: string, value: any, user: UserDTO): Promise<UserDTO> {
    const client = await mongoClient;
    const db = client.db(dbName);

    try {
      const filter = { [field]: value }
      await db.collection(collectionName).updateOne(filter, { $set: user })
      return await db.collection(collectionName).findOne(filter)
    } catch (err) {
      return null
    }
  }
}
