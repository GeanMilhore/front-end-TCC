import React from "react";

import api from "../../api";
import { useNavigate } from "react-router";

export default function useAuth() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(user, password) {
    const formData = new FormData();

    formData.append("user", user);
    formData.append("password", password);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const data = await api.post("/api/loginUsuario", formData, config);

      // validação
      //   localStorage.setItem("token", JSON.stringify(token));
      //   api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.setItem("token", "1234");
      setAuthenticated(true);
      navigate("/MinhaConta");
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/entrar");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
