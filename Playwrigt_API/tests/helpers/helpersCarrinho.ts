import { request, APIRequestContext, expect } from '@playwright/test';
import { config } from '../config/config';
import { userData } from '../data/userData';

// Cria usuário e retorna contexto + ID
export async function setupUsuarioComContexto(): Promise<{ apiRequestContext: APIRequestContext; idUsuario: string }> {
  const apiRequestContext = await request.newContext();

  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.usuarios}`, {
    data: {
      nome: userData.nome,
      email: userData.email,
      password: userData.senha,
      administrador: userData.administrador
    }
  });

  expect(res.status()).toBe(201);
  const body = await res.json();

  return { apiRequestContext, idUsuario: body._id };
}

// Remove usuário criado
export async function teardownUsuario(apiRequestContext: APIRequestContext, idUsuario: string): Promise<void> {
  if (idUsuario) {
    const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(['Registro excluído com sucesso', 'Nenhum registro excluído']).toContain(body.message);
  }
}

// Login e retorna token
export async function login(apiRequestContext: APIRequestContext): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.login}`, {
    data: { email: userData.email, password: userData.senha }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.authorization;
}

// Cadastrar carrinho
export async function cadastrarCarrinho(apiRequestContext: APIRequestContext, token: string, carrinho: any): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.carrinhos}`, {
    headers: { Authorization: token },
    data: carrinho
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  return body._id; // ID do carrinho criado
}

// Buscar carrinho
export async function buscarCarrinho(apiRequestContext: APIRequestContext, token: string, idCarrinho: string): Promise<any> {
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.carrinhos}/${idCarrinho}`, {
    headers: { Authorization: token }
  });

  expect(res.status()).toBe(200);
  return await res.json();
}

// Excluir carrinho
export async function excluirCarrinho(apiRequestContext: APIRequestContext, token: string, idCarrinho: string): Promise<void> {
  const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.carrinhos}/${idCarrinho}`, {
    headers: { Authorization: token }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(['Registro excluído com sucesso', 'Nenhum registro excluído']).toContain(body.message);
}
