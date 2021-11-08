import React from "react";
import Input from "../../../Components/Smart-components/Input/Input";
import UseForm from "../../../Custom-Hooks/UseForm";
import style from "./LoginForm.module.css";
import { UserContext } from "../../../UserContext";
import imgLogin from "../../../resources/images/imgLogin.png";
import Button from "../../Smart-components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";

const LoginForm = () => {
  const email = UseForm();
  const senha = UseForm();
  const navigate = useNavigate();
  const { fazerLogin, simulaLoginAdmin, error, setError } = React.useContext(UserContext);

  animateScroll.scrollToTop()

  function limpaError(){
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.gradient}></div>
        <div
          className={style.gradient}
          style={{ left: "65vw", top: "-10vh" }}
        ></div>
        <div className={style.cardLogin + ' animeLeft'}>
          <div className={style.bemvindo}>
            <div
              className={style.imgBemvindo}
              style={{ backgroundImage: `url(${imgLogin})` }}
            ></div>
            <h2>Bem vindo(a) ao nosso site.</h2>
            <p>É um prazer ter você aqui.</p>
          </div>
          <div className={style.enterLogin}>
            <div>
              <h2>Olá! como vai?</h2>
              <p>Utilize dos seus dados para logar no nosso sistema.</p>
            </div>
            <div className={style.campos}>
              <Input type="text" label="E-mail de usuário:" {...email} />
              <Input type="password" label="Senha de usuário:" {...senha} />
              <Button
                onClick={() => {
                  email.validate()
                  senha.validate()
                  if (email.validate() && senha.validate()) {
                    fazerLogin(email.value, senha.value);
                    // simulaLoginAdmin(email.value, senha.value)
                  }
                }}
              >
                Entrar
              </Button>
              {error && <p style={{color: 'red', marginTop: '3px'}}>{error}</p>}
              {error && limpaError()}
              
            </div>
            <p>
              Não possui conta?
              <span
                className={style.fundoNav}
                style={{
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={async () => {
                  await navigate("../");
                  animateScroll.scrollToBottom();
                }}
              >
                Clique aqui
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
