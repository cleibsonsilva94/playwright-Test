import { APIRequestContext, expect } from '@playwright/test';
import { config } from '../config/config';

// Cadastrar carrinho
export async function cadastrarCarrinho(apiRequestContext: APIRequestContext, token: string, carrinho: any): Promise<string> {
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.carrinhos}`, {
    headers: { Authorization: token },
    data: carrinho
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  return body._id;
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