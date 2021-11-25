import React from "react";
import InputMask from "react-input-mask";
import style from "./Input.module.css";

const InputB = ({
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
  min,
  mask,
}) => {
  const [mostraErro, setMostraErro] = React.useState();
  function handleMouseOver() {
    if (error) {
      setMostraErro(true);
    }
  }
  function handleMouseOut(){
    if(error){
      setMostraErro(false)
    }
  }
  return (
    <>
      <label className={style.label} 
          onMouseLeave={handleMouseOut}>
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
          min={min}
          placeholder={placeholder}
          className={style.input + " " + (error && style.error)}
        />
        {error && <span className={style.alert} onMouseOver={handleMouseOver} >!</span>}
        {error && (
          <>
            <span
              className={style.span}
              style={{ display: mostraErro ? "flex" : "none" }}
            >
              {error}
            </span>
          </>
        )}
      </label>
    </>
  );
};

export default InputB;
