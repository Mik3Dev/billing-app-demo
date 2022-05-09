import express, { Request, Response } from 'express'
import 'dotenv/config'

import { router as billingRouter } from './routes/billing.route'
import { RabbitMQConnector } from './rabbit-mq-connection'
import cors from 'cors'

const PORT = 3000

async function main() {
  RabbitMQConnector.setUrl(process.env.RABBITMQ_URL || '')
  await RabbitMQConnector.createConnection()

  const app = express()
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
  )
  app.use(express.json())
  app.use('/api/billings', billingRouter)

  app.all('*', (_req: Request, res: Response) => {
    res.status(404).json({
      message: 'Not found',
    })
  })

  app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
  })
}

main()
