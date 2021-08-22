import React from "react";

const Input = ({
  id,
  label,
  value,
  type,
  disabled,
  onChange,
  onBlur,
  error,
  placeholder
}) => {
  
  return (
    <>
      <label>
        {label}
        <br />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
        />
      {error && <p style={{color: 'red'}}>{error}</p> }
      </label>
    </>
  );
};

export default Input;
