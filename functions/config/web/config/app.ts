import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from '../../../src/main/web/routes'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app
