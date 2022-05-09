import { Message } from 'amqplib'
import 'dotenv/config'

import app from './app'
import { RabbitMQConnector } from './rabbit-mq-connection'
import { sendEmail } from './controllers/email.controller'

const PORT = 3000

async function main() {
  try {
    RabbitMQConnector.setUrl(process.env.RABBITMQ_URL || '')
    const rabbitMQConnector = await RabbitMQConnector.createConnection()
    rabbitMQConnector?.consume('billing_created', async (message: Message) => {
      await sendEmail(message)
    })

    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
