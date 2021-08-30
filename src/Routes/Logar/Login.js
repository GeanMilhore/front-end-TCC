import React from "react";
import Input from "../../Components/Smart-components/Input/Input";
import UseForm from "../../Custom-Hooks/UseForm";
import style from "./Login.module.css";
import background from "../../resources/images/background-login-2.png";
import { Context } from "../../Context/AuthContext";

const Login = () => {
  const email = UseForm();
  const senha = UseForm();
  const { handleLogin } = React.useContext(Context);

  return (
    <>
      <div className={style.container}>
        <div
          className={style.backgroundContainer}
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "5px",
          }}
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
                  if(email.validate() && senha.validate())
                  handleLogin(email.value, senha.value);
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

export default Login;
