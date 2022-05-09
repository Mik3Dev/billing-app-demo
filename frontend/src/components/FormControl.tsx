import React from 'react'

type Type = 'text' | 'email' | 'number' |'password';

interface Props {
  id: string | undefined;
  name: string | undefined;
  placeholder: string | undefined;
  value: string | number | undefined;
  label: string | undefined;
  disabled: boolean | undefined;
  type: Type;
  onChange: React.ChangeEventHandler<HTMLElement>;
}

const FormControl = ({ id, type, name, value, label, disabled, placeholder, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        { label }
      </label>
      <input 
        type={ type ? type : 'text' }
        className="form-control"
        id={ id }
        name={name}
        onChange={onChange}
        value={value}
        placeholder={ placeholder }
        disabled={ disabled ? disabled : false}
      />
    </div>
  )
}

export default FormControl