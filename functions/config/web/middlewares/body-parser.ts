import { json } from 'express'

export const bodyParser = json({ limit: '50mb' })
