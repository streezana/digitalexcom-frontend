import React from "react"

export const Input = ({
  type = "",
  name = "",
  className = "",
  placeholder = "",
  onChange = () => null,
  checked = "",
  error = "",
  defaultValue = "",
}) => {
  return (
    <div className='container'>
      <input
        type={type}
        name={ name }
        className={className}
        placeholder={placeholder}
        onChange={ onChange }
        checked={ checked }
        defaultValue={defaultValue}
      />
      </div>
  )
}