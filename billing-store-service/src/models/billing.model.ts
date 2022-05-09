import { Document, model, Schema, Types } from 'mongoose'

interface IBilling extends Document {
  name: string
  documentNumber: string
  address: string
  commune: string
  city: string
  activity: string
  email: string
  products?: Types.Array<Types.ObjectId>
  subTotal: number
  tax: number
  taxPct: number
  total: number
  createdAt?: number
  updatedAt?: number
}

const billingSchema = new Schema<IBilling>(
  {
    name: { type: String, required: true },
    documentNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    commune: { type: String, required: true },
    city: { type: String, required: true },
    activity: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    subTotal: { type: Number, required: false },
    tax: { type: Number, required: false },
    taxPct: { type: Number, required: true },
    total: { type: Number, required: false },
  },
  { timestamps: true }
)

billingSchema.pre('save', async function () {
  await this.populate('products')
  const products = this.products?.toObject()

  const subTotal: number =
    products?.reduce((subtotal: number, product: any) => {
      return product.quantity * product.pricePerUnit + subtotal
    }, 0) || 0

  this.subTotal = subTotal
  this.tax = (subTotal * this.taxPct) / 100
  this.total = subTotal * (1 + this.taxPct / 100)
})

export const Billing = model<IBilling>('Billing', billingSchema)
