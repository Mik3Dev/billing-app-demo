import { Product } from './product.interface'

export interface Billing {
  id?: number
  name: string
  documentNumber: string
  address: string
  commune: string
  city: string
  activity: string
  email: string
  products: Product[]
  subTotal: number
  tax: number
  taxPct: number
  total: number
  createdAt?: number
  updatedAt?: number
}
