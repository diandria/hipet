import { ReportRepository } from '../interfaces'
import { ReportDTO } from '../models'
import { MongoClient } from 'mongodb'
import env from '../../../main/env'

const collectionName = 'Report'
const dbName = 'hipet'
const mongoClient = MongoClient.connect(env.mongodb.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

export class MongoReportRepository implements ReportRepository {
  async add (report: ReportDTO): Promise<ReportDTO> {
    const client = await mongoClient
    const db = client.db(dbName)

    try {
      await db.collection(collectionName).insertOne(report)
      return await db.collection(collectionName).findOne({ _id: report._id })
    } catch (err) {
      return null
    }
  }

  async findReportBy (field: string, value: any): Promise<ReportDTO> {
    const client = await mongoClient
    const db = client.db(dbName)

    try {
      return await db.collection(collectionName).findOne({ [field]: value })
    } catch (err) {
      return null
    }
  }

  async delete (reportId: string): Promise<boolean> {
    const client = await mongoClient
    const db = client.db(dbName)

    try {
      await db.collection(collectionName).remove({ _id: reportId })
      return true
    } catch (err) {
      return false
    }
  }

  async listByPost (postId: string, limit: number = 100): Promise<ReportDTO[]> {
    const client = await mongoClient
    const db = client.db(dbName)

    try {
      return await db.collection(collectionName).find({ post_id: postId }).limit(limit).toArray()
    } catch (err) {
      return null
    }
  }
}
