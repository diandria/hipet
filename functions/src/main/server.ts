import { https } from 'firebase-functions'
import express from 'express'
import setupMiddlewares from '../../config/web/config/middlewares'
import setupRoutes from '../../src/main/web/routes'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
exports.hipet = https.onRequest(app)
