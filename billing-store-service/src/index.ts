import 'reflect-metadata'
import 'dotenv/config'
import { Message } from 'amqplib'
import mongoose from 'mongoose'

import app from './app'
import { RabbitMQConnector } from './rabbit-mq-connection'
import { createBilling } from './controllers/billing.controller'

const PORT = 3000

async function main() {
  try {
    RabbitMQConnector.setUrl(process.env.RABBITMQ_URL || '')
    const rabbitMQConnector = await RabbitMQConnector.createConnection()
    rabbitMQConnector?.consume(
      'billing_creation_request',
      async (message: Message) => {
        await createBilling(message)
      }
    )

    const MONGO_URL = process.env.MONGO_URL || ''
    await mongoose.connect(MONGO_URL)
    console.log('connected to mongodb: ', MONGO_URL)

    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
