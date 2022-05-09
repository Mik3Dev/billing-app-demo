import { Request, Response } from 'express'
import { Billing } from '../models/billing.model'
import { Product } from '../models/product.model'
import { Billing as BillingInterface } from '../interfaces/billing.interface'
import { Product as ProductInterface } from '../interfaces/product.interface'
import { RabbitMQConnector } from '../rabbit-mq-connection'
import { Message } from 'amqplib'

const TAX_PCT = Number(process.env.TAX_PCT)

export const createBilling = async (msg: Message): Promise<boolean> => {
  try {
    const billingReq: BillingInterface = JSON.parse(msg.content.toString())
    console.log('Creating billing: ', billingReq)

    const { name, documentNumber, address, commune, city, email, activity } =
      billingReq
    const productsReq: ProductInterface[] = billingReq.products

    const productsId = await Promise.all(
      productsReq.map(async (product) => {
        const productSaved = await Product.create({
          name: product.name,
          unit: product.unit,
          quantity: product.quantity,
          pricePerUnit: product.pricePerUnit,
        })
        return productSaved.id
      })
    )

    const billing = await Billing.create({
      name,
      documentNumber,
      address,
      commune,
      city,
      email,
      activity,
      taxPct: TAX_PCT,
      products: productsId,
    })

    const rabbitMQConnector = await RabbitMQConnector.createConnection()
    rabbitMQConnector?.sendToQueue(
      'billing_created',
      Buffer.from(JSON.stringify(billing))
    )

    return true
  } catch (error) {
    console.log('Error creating billing: ', error)
    return false
  }
}

export const getBillings = async (_req: Request, res: Response) => {
  const billings = await Billing.find().populate('products')
  res.json({
    billings,
  })
}

export const getBilling = async (req: Request, res: Response) => {
  const { id } = req.body
  const billing = await Billing.findById(id).populate('products')
  if (billing) {
    res.json({
      billing,
    })
  }
  res.status(404).json({
    message: 'Not found',
  })
}
