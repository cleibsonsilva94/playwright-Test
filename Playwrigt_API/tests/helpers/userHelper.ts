import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { userData } from '../data/userData';

export async function setupUsuario(): Promise<{ apiRequestContext: APIRequestContext; idUsuario: string }> {
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

export async function teardownUsuario(apiRequestContext: APIRequestContext, idUsuario: string): Promise<void> {
  if (idUsuario) {
    const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Registro excluído com sucesso');
  }
}

export async function loginUsuario(apiRequestContext: APIRequestContext, email: string, senha: string): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.login}`, {
    data: { email, password: senha }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.authorization;
}

export async function buscarUsuario(apiRequestContext: APIRequestContext, idUsuario: string): Promise<any> {
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`);
  expect(res.status()).toBe(200);
  return await res.json();
}

export async function atualizarUsuario(apiRequestContext: APIRequestContext, idUsuario: string, dados: any): Promise<void> {
  const res = await apiRequestContext.put(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`, {
    data: dados
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('Registro alterado com sucesso');
}