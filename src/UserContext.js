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
      setDadosUsuario(null);
      setError(null);
      setLogado(false);
      setLoading(false);
      window.localStorage.removeItem("token");
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
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogado(false);
    } finally {
      setLoading(false);
    }
  }

  async function getUser(token) {
    const { url, options } = PEGA_DADOS_USUARIO(token);

    const userRes = await fetch(url, options);
    const dataUser = await userRes.json();
    setDadosUsuario(dataUser);
    setLogado(true);
  }

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
        } finally {
          setLoading(false);
        }
      }
    }
    // autoLogar();

    function simularAutoLogar() {
      const token = window.localStorage.getItem("token");
      const nome = window.localStorage.getItem("nome");
      const senha = window.localStorage.getItem("senha");
      const tipo = window.localStorage.getItem('tipo')
      if (token && nome && senha && tipo && token === "123456789") {
        {
          tipo === "doador"
            ? simularLoginDoador(nome, senha)
            : simularLoginOng(nome, senha);
        }
      }
    }

    simularAutoLogar();
  }, [fazerLogout]);

  // Funções de SIMULAÇÃO

  async function simularLoginOng(username, password) {
    // simulando um token válido e um get nos dados do usuário
    setError(null);
    setLoading(true);
    window.localStorage.setItem("token", 123456789);
    window.localStorage.setItem("nome", username);
    window.localStorage.setItem("senha", password);
    window.localStorage.setItem("tipo", 'instituicao')
    await setDadosUsuario({
      nome: username,
      senha: password,
      tipo: "instituicao",
      email: `${username}@gmail.com`,
      dataCriacao: "2002-04-08",
      cnpj: `12.123.123/1234-12`,
      razaoSocial: "essa é uma razão muito social",
      focoinstitucional: "um foco muito bom aqui",
      telefone: `+55 (11) 96${parseInt(Math.random() * 1000)}-${parseInt(
        Math.random() * 10000
      )}`,
      cep: "08532-120",
      rua: "Neusa Rodrigues Ramos",
      numero: "70",
      complemento: "montreal Eventos",
      cidade: "Ferraz de Vasconcelos",
      estado: "SP",
    });
    setTimeout(() => {
      setLogado(true);
      setLoading(false);
      // navigate('/conta')
    }, 1000);
  }

  async function simularLoginDoador(username, password) {
    // simulando um token válido e um get nos dados do usuário
    setError(null);
    setLoading(true);
    window.localStorage.setItem("token", 123456789);
    window.localStorage.setItem("nome", username);
    window.localStorage.setItem("senha", password);
    window.localStorage.setItem("tipo", 'doador');
    await setDadosUsuario({
      nome: username,
      senha: password,
      tipo: "doador",
      email: `${username}@gmail.com`,
      dataCriacao: "2015-08-12",
      cpf: `123.123.123-12`,
      telefone: `+55 (11) 96${parseInt(Math.random() * 1000)}-${parseInt(
        Math.random() * 10000
      )}`,
      cep: "08532-120",
      rua: "Neusa Rodrigues Ramos",
      numero: "70",
      complemento: "montreal Eventos",
      cidade: "Ferraz de Vasconcelos",
      estado: "SP",
    });
    setTimeout(() => {
      setLogado(true);
      setLoading(false);
      // navigate('/conta')
    }, 1000);
  }

  return (
    <UserContext.Provider
      value={{
        fazerLogin,
        fazerLogout,
        dadosUsuario,
        error,
        loading,
        logado,
        simularLoginOng,
        simularLoginDoador,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
