import amqplib, { Channel, Connection } from 'amqplib'

export class RabbitMQConnector {
  static instance: RabbitMQConnector
  static url: string | undefined
  private rabbitMQConnection: Connection | undefined
  private rabbitMQChannel: Channel | undefined

  private constructor() {
    //
  }

  static async createConnection(): Promise<RabbitMQConnector | undefined> {
    if (!!RabbitMQConnector.instance) return RabbitMQConnector.instance

    try {
      RabbitMQConnector.instance = new RabbitMQConnector()

      RabbitMQConnector.instance.rabbitMQConnection = await amqplib.connect(
        RabbitMQConnector.url || ''
      )
      RabbitMQConnector.instance.rabbitMQChannel =
        await RabbitMQConnector.instance.rabbitMQConnection.createChannel()

      process.on('beforeExit', () => {
        console.log('Closing RabbitMQ connection')
        RabbitMQConnector.instance.connector?.close()
      })

      return RabbitMQConnector.instance
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  static setUrl(url: string) {
    RabbitMQConnector.url = url
  }

  get connector(): Connection | undefined {
    return this.rabbitMQConnection
  }

  get channel(): Channel | undefined {
    return this.rabbitMQChannel
  }

  async sendToQueue(
    queue: string,
    content: Buffer,
    durable = true,
    persistent = true
  ): Promise<boolean> {
    try {
      await this.rabbitMQChannel?.assertQueue(queue, { durable })
      return (
        this.rabbitMQChannel?.sendToQueue(queue, content, { persistent }) ||
        false
      )
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async consume(
    queue: string,
    handleMessage: Function,
    noAck = true
  ): Promise<void> {
    try {
      await this.rabbitMQChannel?.assertQueue(queue)
      await this.rabbitMQChannel?.consume(
        queue,
        (message) => {
          handleMessage(message)
        },
        { noAck }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
