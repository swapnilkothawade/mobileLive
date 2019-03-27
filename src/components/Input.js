import React from 'react';

export default function Input({type, name, value, className, placeholder, onChange}) {
  return (
    <div className="input-group mb-3">
      <input type={type} name={name} value={value} className={className} placeholder={placeholder} onChange={ onChange } />
    </div>
  )
}

