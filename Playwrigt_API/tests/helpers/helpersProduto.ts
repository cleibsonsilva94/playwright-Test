import { APIRequestContext, request, expect } from '@playwright/test';
import { config } from '../config/config';
import { prodData } from '../data/prodData';

export async function setupUsuarioComContexto(): Promise<{ apiRequestContext: APIRequestContext; idUsuario: string }> {
  const apiRequestContext = await request.newContext();

  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.usuarios}`, {
    data: {
      nome: prodData.nome,
      email: prodData.email,
      password: prodData.senha,
      administrador: prodData.administrador
    }
  });

  expect(res.status()).toBe(201);
  const body = await res.json();

  return { apiRequestContext, idUsuario: body._id };
}

export async function teardownUsuario(apiRequestContext: APIRequestContext, idUsuario: string): Promise<void> {
  if (idUsuario) {
    const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(['Registro excluído com sucesso', 'Nenhum registro excluído']).toContain(body.message);
  }
}

export async function login(apiRequestContext: APIRequestContext): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.login}`, {
    data: { email: prodData.email, password: prodData.senha }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.authorization;
}

export async function cadastrarProduto(apiRequestContext: APIRequestContext, token: string, produto: any): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.produtos}`, {
    headers: { Authorization: token },
    data: produto
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  return body._id;
}

export async function buscarProduto(apiRequestContext: APIRequestContext, token: string, idProduto: string): Promise<any> {
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.produtos}/${idProduto}`, {
    headers: { Authorization: token }
  });

  expect(res.status()).toBe(200);
  return await res.json();
}

export async function excluirProduto(apiRequestContext: APIRequestContext, token: string, idProduto: string): Promise<void> {
  const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.produtos}/${idProduto}`, {
    headers: { Authorization: token }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(['Registro excluído com sucesso', 'Nenhum registro excluído']).toContain(body.message);

}

/*
==========================================
Comentários
==========================================

Importações
- expect → Função do Playwright usada para fazer asserções (validações) nos testes.
- APIRequestContext → Tipo do Playwright que representa o contexto para fazer requisições HTTP.
- config → Arquivo central com baseURL e endpoints, para evitar repetição de URLs.
- prodData → Contém credenciais do usuário (email e senha).

Função login(request)
Objetivo: Autenticar o usuário e obter o token JWT.
Passos:
1. Faz um POST para o endpoint de login (/login) usando request.post().
2. Envia no corpo (data) o email e senha do usuário.
3. Valida que o status da resposta é 200 com expect(res.status()).toBe(200).
4. Converte a resposta para JSON com await res.json().
5. Retorna body.authorization (token JWT), que será usado nas próximas requisições.
Por que usar expect aqui? Para garantir que o login foi bem-sucedido antes de continuar.

Função cadastrarProduto(request, token, produto)
Objetivo: Criar um novo produto na API.
Passos:
1. Faz um POST para /produtos usando request.post().
2. Inclui o token no header (Authorization) para autenticação.
3. Envia os dados do produto no corpo (data).
4. Valida que o status é 201 (Created).
5. Converte a resposta para JSON e retorna o _id do produto criado.
Por que retornar _id? Para usar esse ID em operações futuras (buscar ou excluir).

Função buscarProduto(request, token, idProduto)
Objetivo: Consultar os detalhes de um produto pelo ID.
Passos:
1. Faz um GET para /produtos/{id}.
2. Inclui o token no header para autenticação.
3. Valida que o status é 200 (OK).
4. Retorna o corpo da resposta (dados do produto).
Por que validar status? Para garantir que a busca foi bem-sucedida antes de usar os dados.

Função excluirProduto(request, token, idProduto)
Objetivo: Remover um produto pelo ID.
Passos:
1. Faz um DELETE para /produtos/{id}.
2. Inclui o token no header para autenticação.
3. Valida que o status é 200.
4. Converte a resposta para JSON.
5. Verifica se a mensagem é uma das esperadas:
   - "Registro excluído com sucesso" ou "Nenhum registro excluído".
Por que essa verificação? Porque a API pode retornar que não havia registro para excluir, e isso não deve quebrar o teste.

Funções usadas e por que
- request.post(), request.get(), request.delete() → Métodos do Playwright para fazer requisições HTTP.
- expect() → Validações para garantir que cada etapa foi bem-sucedida.
- await res.json() → Converte a resposta da API para objeto JavaScript.
- headers: { Authorization: token } → Necessário para autenticação nas rotas protegidas.
*/