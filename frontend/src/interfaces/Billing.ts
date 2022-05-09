import { Product } from './Product'
export interface Billing {
  _id?: string
  name?: string
  documentNumber?: string
  address?: string
  commune?: string
  city?: string
  activity?: string
  email?: string
  products?: Product[]
  netPrice?: number
  tax?: number
  totalPrice?: number
}
