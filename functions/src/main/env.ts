import { config } from 'dotenv'

config()

const app = {
  node: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
  base_url: process.env.BASE_URL
}

const mongodb = {
  mongoUrl: process.env.MONGO_URL
}

const env = {
  app,
  mongodb
}

export default { ...env }
