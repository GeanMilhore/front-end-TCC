export const API_URL = "http://192.168.1.104:8080";

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
      },
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

export function PEGA_DADOS_ONG(token, id) {
  return {
    url: API_URL + `/instituicoes/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function CADASTRAR_DOADOR(body) {
  return {
    url: API_URL + "/doadores",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

//http metodo 'POST'
export function CADASTRAR_INSTITUICAO(body) {
  return {
    url: API_URL + "/instituicoes",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function EDITAR_ONG(body, token, id) {
  return {
    url: API_URL + `/instituicoes/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function EDITAR_DOADOR(body, token, id) {
  return {
    url: API_URL + `/doadores/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function EXCLUIR_DOADOR(token, id) {
  return {
    url: API_URL + `/doadores/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function EXCLUIR_ONG(token, id) {
  return {
    url: API_URL + `/instituicoes/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function REALIZAR_DOACAO(body, token) {
  return {
    url: API_URL + `/itens`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function DOACOES_REALIZADAS(token) {
  return {
    url: API_URL + `/itens`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function DOACAO_REALIZADA(token, id) {
  return {
    url: API_URL + `/itens/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function EXCLUIR_DOACAO(token, id) {
  return {
    url: API_URL + `/itens/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function CADASTRA_ITEM(body, token) {
  return {
    url: API_URL + "/itensMonetarios",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function DOACOES_CADASTRADAS(token) {
  return {
    url: API_URL + "/itensMonetarios",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function DOACAO_CADASTRADA(token, id) {
  return {
    url: API_URL + `/itensMonetarios/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function EXCLUI_DOACAO_ONG(token, id) {
  return {
    url: API_URL + `/itensMonetarios/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function EDITA_DOACAO(body, token, id) {
  return {
    url: API_URL + `/itensMonetarios/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function LISTAR_ONGS(pagina, size) {
  return {
    url:
      API_URL +
      `/instituicoes?${pagina ? `page=${pagina}` : null}${
        size ? `&size=${size}` : null
      }`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function LISTAR_DOADORES(token, pagina, size) {
  return {
    url:
      API_URL +
      `/doadores?${pagina ? `page=${pagina}` : null}${
        size ? `&size=${size}` : null
      }`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function LISTAR_DOACOES(token, pagina, size) {
  return {
    url:
      API_URL +
      `/itens?${pagina ? `page=${pagina}` : null}${
        size ? `&size=${size}` : null
      }`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function RELATORIO_DOADORES() {
  return {
    url: API_URL + `/relatorios/doador`,
    options: {
      method: "POST",
    },
  };
}

export function RELATORIO_ONGS() {
  return {
    url: API_URL + `/relatorios/ong`,
    options: {
      method: "POST",
    },
  };
}

export function RELATORIO_DOACOES() {
  return {
    url: API_URL + `/relatorios/doacao`,
    options: {
      method: "POST",
    },
  };
}

export function PROPOSTAS_ONG(token) {
  return {
    url: API_URL + "/propostas",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}

export function PEGAR_PROPOSTAS_DOADOR(token) {
  return {
    url: API_URL + "/propostas",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  };
}
