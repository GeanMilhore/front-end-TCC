export const API_URL = "http://localhost:8080";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/login/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      }
    },
  };
}




export function PEGA_DADOS_USUARIO(token) {
  return {
    url: API_URL + "/usuario",
    options: {
      method: "GET",
      headers: {
        // Authorization: "Bearer " + token,
        Authorization: token,
      },
    },
  };
}

export function CADASTRAR_DOADOR(body){
  return {
    url: API_URL + "/doadores",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }
  }
}

//http metodo 'POST'
export function CADASTRAR_INSTITUICAO(body){
  return {
    url: API_URL + "/instituicoes",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }
  }
}
