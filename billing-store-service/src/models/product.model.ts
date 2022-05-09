import { Schema, model, Document } from 'mongoose'

interface IProduct extends Document {
  name: string
  unit?: string
  quantity: number
  pricePerUnit: number
  total?: number
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    unit: { type: String, required: false },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    total: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
)

productSchema.pre('save', function () {
  this.total = this.quantity * this.pricePerUnit
})

export const Product = model<IProduct>('Product', productSchema)
