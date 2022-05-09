import { Billing } from '../interfaces/billing.interface'
import nodemailer from 'nodemailer'
import { Message } from 'amqplib'

export const sendEmail = async (message: Message): Promise<boolean> => {
  try {
    const billing: Billing = JSON.parse(message.content.toString())
    console.log('Sending billing email: ', billing)

    const { email, name, _id } = billing

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'qv5xbn6jc5gzyp7y@ethereal.email',
        pass: 'r9y9EfsjSJEdTzsTG5',
      },
    })

    await transporter.sendMail({
      from: '"Billing App" <no-reply@example.com>',
      to: `${name} <${email}>`,
      subject: `Factura No. ${_id}`,
      html: `
        <p>Hola <strong>${name}</strong>,</p>
        <br>
        <p>Se envia detalle de factura No. ${_id}.</p>
        <br>
        <pre>
          ${JSON.stringify(billing, null, 2)}
        </pre>
      `,
    })

    return true
  } catch (error) {
    console.log('Error sending billing email: ', error)
    return false
  }
}
