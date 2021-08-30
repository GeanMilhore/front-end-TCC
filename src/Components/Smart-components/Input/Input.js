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
          maxLength={maxLength}
          mask={mask}
          placeholder={placeholder}
        />
      {error && <><span style={{color: 'red'}}>{error}</span></>}
      </label>
    </>
  );
};

export default Input;
