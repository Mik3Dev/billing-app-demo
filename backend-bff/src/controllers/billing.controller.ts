import axios from 'axios'
import { Request, Response } from 'express'
import { Billing } from '../interfaces/billing.interface'
import { RabbitMQConnector } from '../rabbit-mq-connection'

const BILLING_STORAGE_URL = process.env.BILLING_STORAGE_URL

export const createBilling = async (req: Request, res: Response) => {
  const billing: Billing = req.body
  console.log(billing)

  try {
    const rabbitMQConnector = await RabbitMQConnector.createConnection()
    rabbitMQConnector?.sendToQueue(
      'billing_creation_request',
      Buffer.from(JSON.stringify(billing))
    )
    return res.status(201).json({ message: 'Factura creada con exito.' })
  } catch (error: any) {
    console.log('Error trying to create a billing: ', error)
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data })
    }
    return res.status(500).json({ message: 'Ups algo salio mal' })
  }
}

export const getBillings = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BILLING_STORAGE_URL}/api/billings`)
    return res.json(response.data)
  } catch (error: any) {
    console.log('Error trying to get billings: ', error)
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data })
    }
    return res.status(500).json({ message: 'Ups algo salio mal' })
  }
}

export const getBilling = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await axios.get(
      `${BILLING_STORAGE_URL}/api/billings/${id}`
    )
    return res.json(response.data)
  } catch (error: any) {
    console.log('Error trying to get a billing: ', error)
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data })
    }
    return res.status(500).json({ message: 'Ups algo salio mal' })
  }
}
