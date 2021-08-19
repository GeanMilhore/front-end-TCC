import React from "react";

const Input = ({ value, setValue, label, type, id, disabled, ...props }) => {

  function handleChange({target}){
    setValue(target.value)
  }

  return (
    <label>
      {label}<br/>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
    </label>
  );
};

export default Input;
