import React from 'react'
import { Product } from '../interfaces/Product';

interface Props {
  products: Product[],
}

const ProductLists = ({ products }: Props) => {

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Descripcion</th>
          <th scope='col'>Unidad</th>
          <th scope='col'>Cantidad</th>
          <th scope='col'>Precio Unitario</th>
          <th scope='col'>Total</th>
        </tr>
      </thead>
      <tbody>
        { products.map((product, index) => {
          return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>{product.quantity}</td>
                <td>{product.pricePerUnit}</td>
                <td>{product.total}</td>
              </tr>
          )
        }) }
        </tbody>
    </table>
  )
}

export default ProductLists