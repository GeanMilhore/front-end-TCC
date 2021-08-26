import React from "react";
import InputMask from 'react-input-mask'

const Input = ({
  id,
  label,
  value,
  type,
  disabled,
  onChange,
  onBlur,
  error,
  placeholder,
  maxLength,
  mask
}) => {
  
  return (
    <>
      <label>
        {label}
        <br />
        <InputMask
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          mask={mask}
        />
      {error && <p style={{color: 'red'}}>{error}</p> }
      </label>
    </>
  );
};

export default Input;
