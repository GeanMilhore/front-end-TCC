import React from "react";

const Input = ({ value, setValue, label, type, id, onChange }) => {
  return (
    <label>
      {label}<br/>
      <input
        id={id}
        type={type}
        value={value}
        setValue={setValue}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
