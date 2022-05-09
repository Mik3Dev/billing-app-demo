import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import BillingForm from './BillingForm';
import { Billing } from '../interfaces/Billing';
import ProductLists from './ProductLists';
import AddProduct from './AddProduct';
import { Product } from '../interfaces/Product';
import axios from 'axios';

const TAX_PCT = 19
const createBillingURL = 'http://localhost:4000/api/billings'

const BillingCard = () => {
  const [billing, setBilling] = useState<Billing>()
  const [netPrice, setNetPrice] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)

  useEffect(() => {
    setBilling({
      name: '',
      documentNumber: '',
      address: '',
      commune: '',
      city: '',
      email: '',
      activity: '',
      products: [],
      netPrice: 0,
      tax: 0,
      totalPrice: 0,
    })
  }, [])

  useEffect(() => {
    const subTotal = billing?.products?.reduce((subT, prod) => { 
      return subT + (prod.total || 0)
    }, 0)
    setNetPrice(subTotal || 0)
  }, [billing])

  useEffect(() => {
    setTax(netPrice * TAX_PCT / 100)
  }, [netPrice])
  
  useEffect(() => {
    setTotal(netPrice + tax)
  }, [netPrice, tax])

  useEffect(() => {
    setBilling({
      ...billing,
      netPrice,
      tax,
      totalPrice: total
    })
  }, [netPrice, tax, total])
  
  

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({
      ...billing,
      [target.name]: target.value
    })
  } 

  const addProduct = (product: Product): void => {
    const products = billing?.products ? billing?.products : []
    console.log(products)
    products?.push(product)
    console.log(products)
    setBilling({
      ...billing,
      products,
    })
  }

  const submit = async () => {
    try {
      const response = await axios.post(createBillingURL, {
        name: billing?.name,
        documentNumber: billing?.documentNumber,
        address: billing?.address,
        commune: billing?.commune,
        city: billing?.city,
        email: billing?.email,
        activity: billing?.activity,
        products: billing?.products,
        subTotal: billing?.netPrice,
      })
      console.log(response)
      Swal.fire(
        'Factura Creada',
        'Factura creada con exito',
        'success'
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire(
          'Ups...',
          'Faltan datos por completar',
          'error'
        );
        return
      }
      Swal.fire(
        'Ups...',
        'Algo salio mal',
        'error'
      );
    }
  }

  return (
    <>
      <div className='card mt-5'>
        <div className="card-body">
          <h5 className="card-title">Facturación</h5>
          <BillingForm billing={billing} onChange={handleOnChange} />
        </div>
      </div>
      <div className='card my-5'>
        <div className="card-footer">
          <AddProduct addProduct={addProduct} />
        </div>
        <div className="card-body">
          <ProductLists products={billing?.products || []} />
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-primary" onClick={submit}>Crear Factura</button>
        </div>
      </div>
    </>
  )
}

export default BillingCard