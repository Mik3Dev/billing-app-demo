import React, {useEffect, useState} from 'react'
import { Product } from '../interfaces/Product'
import FormControl from './FormControl';

interface Props {
  addProduct: Function,
}

const AddProduct = ({ addProduct }: Props) => {

  const [isCreateNewProductActive, setIsCreateNewProductActive] = useState<boolean>(false)
  const [product, setProduct] = useState<Product|undefined>(undefined)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal((product?.quantity || 0) * (product?.pricePerUnit || 0))
  }, [product])

  useEffect(() => {
    setProduct({
      ...product, 
      total
    })
  }, [total])

  const toggleModal = () => {
    setIsCreateNewProductActive(!isCreateNewProductActive)
  }

  const cancel = (): void => {
    setProduct({
      name: '',
      unit: '',
      pricePerUnit: 0,
      quantity: 0,
      total: 0,
    })
    toggleModal()
  }

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    setProduct({
      ...product, 
      [target.name]: target.value
    })
  }

  const addProd = (): void => {
    addProduct(product)
    cancel()
  }

  return (
    <div>
      {
        !isCreateNewProductActive ? 
          <div className="d-flex justify-content-end">
            <button type="button" className='btn btn-primary' onClick={toggleModal}>
              Agregar
            </button>
          </div>
        :
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Crear un producto</h5>
            <div className="row">
              <div className="col col-sm-6">
                <FormControl type="text" id="name" name="name" label="Descripcion del producto" value={product?.name} onChange={handleOnChange} placeholder="" disabled={false} />
              </div>
              <div className="col col-sm-6">
                <FormControl type="text" id="unit" name="unit" label="Unidad" value={product?.unit} onChange={handleOnChange} placeholder="" disabled={false} />
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-4">
                <FormControl type="number" id="quantity" name="quantity" label="Cantidad" value={product?.quantity} onChange={handleOnChange} placeholder="" disabled={false} />
              </div>
              <div className="col col-sm-4">
                <FormControl type="number" id="pricePerUnit" name="pricePerUnit" label="Precio por unidad" value={product?.pricePerUnit} onChange={handleOnChange} placeholder="" disabled={false} />
              </div>
              <div className="col col-sm-4">
                <FormControl type="number" id="total" name="total" label="Total" value={total} onChange={handleOnChange} placeholder="" disabled={true} />
              </div>
            </div>
          </div>
  
          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-light mx-2" onClick={cancel}>Cancelar</button>
            <button className="btn btn-primary mx-2" onClick={addProd}>Agregar</button>
          </div>
        </div>
      }
    </div>
  )
}

export default AddProduct