import React from "react";
import Input from "../../../Components/Smart-components/Input/Input";
import UseForm from "../../../Custom-Hooks/UseForm";
import style from "./LoginForm.module.css";
import background from "../../../resources/images/background-login-2.png";
import { UserContext } from "../../../UserContext";

const LoginForm = () => {
  const email = UseForm();
  const senha = UseForm();
  const { simularLoginOng, simularLoginDoador } = React.useContext(UserContext);

  return (
    <>
      <div className={style.container}>
        <div
          className={style.backgroundContainer}
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className={style.containerLogin}>
            <div className={style.headerLogin}>Faça Seu Login</div>
            <div className={style.bodyLogin}>
              <Input id="email" label="E-mail:" type="e-mail" {...email} />
              <Input id="senha" label="Senha: " type="password" {...senha} />
            </div>
            <div className={style.footerLogin}>
              <button
                onClick={() => {
                  if (email.validate() && senha.validate()) {
                    // simularLoginDoador(email.value, senha.value)
                    simularLoginOng(email.value, senha.value)
                  }
                }}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
