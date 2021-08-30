import React from "react";

const types = {
  cep: {
    regex: /^\d{5}-?\d{3}$/,
    messageError: "Cep ínvalido!",
    teste: "_____-___"
  },
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    messageError: "E-mail ínvalido!",
    teste: ""
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    messageError: "CPF ínvalido!",
    teste: "___.___.___-__"
  },
  telefone: {
    regex: /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/,
    teste: "+__ (__) _____-____",
    messageError: "Número de Telefone ínvalido!"
  },
  cnpj: {
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
    teste: "__.___.___/____-__",
    messageError: "Cnpj Ínvalido!",
  }
};

const UseForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true

    if (value.length === 0 ) {
      setError("! Preencha o Campo Vazio !");
      return false;
    } else if(types[type] && value === types[type].teste){
      setError("! Preencha o Campo Vazio !");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].messageError);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    error,
    setError,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default UseForm;
