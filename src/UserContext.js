import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, PEGA_DADOS_USUARIO } from "./api";
import { useNavigate } from "react-router";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [dadosUsuario, setDadosUsuario] = React.useState(null);
  const [logado, setLogado] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const fazerLogout = React.useCallback(
    async function () {
      window.localStorage.removeItem("token");
      await setDadosUsuario(null);
      console.log(dadosUsuario)
      setError(null);
      setLogado(false);
      setLoading(false);
      navigate("/login");
    },
    [navigate]
  );

  async function fazerLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({
        email: username,
        senha: password,
      });

      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error("Usuário Ínvalido");
      const json = await tokenRes.json();
      const token = await json.token;
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate('/conta/home')
    } catch (err) {
      setError(err.message);
      setLogado(false);
    } finally {
      setLoading(false);
    }
  }

  async function getUser(token) {
    const { url, options } = PEGA_DADOS_USUARIO(token);

    try {
      const userRes = await fetch(url, options);
      const dataUser = await userRes.json();
      setDadosUsuario(dataUser);
      setLogado(true);
    } catch(error){
      console.log(error)
    }

  }

  async function refreshUser() {
    const token = window.localStorage.getItem("token");
    if (token) {
      await getUser(token);
      return dadosUsuario;
    } else {
      return false
    }
  }

  async function simulaLoginAdmin(email, senha){
    const dadosAdmin = {
      nome : "administrador",
      email : "admin@gmail.com",
      senha : "admin" ,
      id : 11,
      tipo: 'ADMIN'
    }
    if(email == dadosAdmin.email && senha == dadosAdmin.senha){
      window.localStorage.setItem('token', dadosAdmin.id)
      setLogado(true)
      setDadosUsuario(dadosAdmin)
      return dadosAdmin
    } else {
      setError('Usuário Ínvalido!')
      console.log('oops')
    }
  }

  async function simulaAutoLoginAdmin(){
    if(window.localStorage.getItem('token')){
      simulaLoginAdmin('admin@gmail.com', 'admin')
    }
  }

  // apenas quando refrescamos a página
  React.useEffect(() => {
    async function autoLogar() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const loginRes = await fetch(url, options);
          if (!loginRes.ok) throw new Error("Token Ínvalido!");
          getUser(token);
        } catch (err) {
          fazerLogout();
          console.log(err)
          console.log(token)
        } finally {
          setLoading(false);
        }
      }
    }

    // autoLogar();
    async function simularAutoLogar() {
      const token = await window.localStorage.getItem('token')
      console.log(token)
      if(token){
          getUser(token)
      } 
    }

    // autoLogar();
    simularAutoLogar();
    // simulaAutoLoginAdmin()
  }, [fazerLogout]);

  return (
    <UserContext.Provider
      value={{
        fazerLogin,
        fazerLogout,
        dadosUsuario,
        simulaLoginAdmin,
        error,
        setError,
        loading,
        logado,
        getUser,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
