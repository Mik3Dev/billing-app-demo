import React from 'react'
import { Billing } from '../interfaces/Billing';
import FormControl from './FormControl';

interface Props {
  billing: Billing |undefined,
  onChange: React.ChangeEventHandler<HTMLElement>;
}

const BillingForm = ({ billing, onChange }: Props) => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  } 

  return (
    <form action="">
      <div className="row">
        <div className="col col-sm-6">
          <FormControl type="text" id="name" name="name" label="Nombres" value={billing?.name} onChange={handleOnChange} placeholder="" disabled={false} />
        </div>
        <div className="col col-sm-6">
          <FormControl type="text" id="documentNumber" name="documentNumber" label="RUT" value={billing?.documentNumber} onChange={handleOnChange}  placeholder="12.456.789-k" disabled={false} />
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-6">
          <FormControl type="text" id="email" name="email" label="Correo Electrónico" value={billing?.email} onChange={handleOnChange}  placeholder="" disabled={false} />
        </div>
        <div className="col col-sm-6">
          <FormControl type="text" id="activity" name="activity" label="Giro" value={billing?.activity} onChange={handleOnChange}  placeholder="" disabled={false} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormControl type="text" id="address" name="address" label="Dirección" value={billing?.address} onChange={handleOnChange}  placeholder="" disabled={false}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-6">
          <FormControl type="text" id="commune" name="commune" label="Comuna" value={billing?.commune} onChange={handleOnChange}  placeholder="" disabled={false}/>
        </div>
        <div className="col col-sm-6">
          <FormControl type="text" id="city" name="city" label="Ciudad" value={billing?.city} onChange={handleOnChange}  placeholder="" disabled={false} />
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-4">
          <FormControl type="number" id="netPrice" name="netPrice" label="Subtotal" value={billing?.netPrice} onChange={handleOnChange}  placeholder="" disabled={true}/>
        </div>
        <div className="col col-sm-4">
          <FormControl type="number" id="tax" name="tax" label="Impuesto" value={billing?.tax} onChange={handleOnChange}  placeholder="" disabled={true} />
        </div>
        <div className="col col-sm-4">
          <FormControl type="number" id="totalPrice" name="totalPrice" label="Total" value={billing?.totalPrice} onChange={handleOnChange}  placeholder="" disabled={true} />
        </div>
      </div>
    </form>
  )
}

export default BillingForm