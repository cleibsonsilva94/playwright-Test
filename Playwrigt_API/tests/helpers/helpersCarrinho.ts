import { APIRequestContext, expect } from '@playwright/test';
import { config } from '../config/config';
import { setupUsuario, loginUsuario } from './helperUser';
import { cadastrarProduto } from './helpersProduto';
import { prodData } from '../data/prodData';
import { carrinhoData } from '../data/carrinhoData';
import { userData } from '../data/userData';

// Função para preparar ambiente do carrinho
export async function setupCarrinho(): Promise<{
  apiRequestContext: APIRequestContext;
  idUsuario: string;
  token: string;
  produtoId1: string;
  produtoId2: string;
}> {
  // 1. Cria usuário e contexto
  const { apiRequestContext, idUsuario } = await setupUsuario();

  // 2. Login
  const token = await loginUsuario(apiRequestContext, userData.email, userData.senha);

  // 3. Cria dois produtos
  const produtoId1 = await cadastrarProduto(apiRequestContext, token, {
    nome: prodData.nomeDoProduto,
    descricao: prodData.descricao,
    preco: prodData.preco,
    quantidade: prodData.quantidade
  });

  const produtoId2 = await cadastrarProduto(apiRequestContext, token, {
    nome: prodData.nomeDoProduto2,
    descricao: prodData.descricao,
    preco: prodData.preco,
    quantidade: prodData.quantidade
  });

  // 4. Atualiza carrinhoData dinamicamente
  carrinhoData.produtos[0].idProduto = produtoId1;
  carrinhoData.produtos[1].idProduto = produtoId2;

  return { apiRequestContext, idUsuario, token, produtoId1, produtoId2 };
}

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
// Concluir compra (excluir carrinho sem devolver produtos ao estoque)
export async function concluirCompra(apiRequestContext: APIRequestContext, token: string): Promise<void> {
  const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.carrinhos}`, {
    headers: { Authorization: token }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(['Registro excluído com sucesso', 'Não foi encontrado carrinho para esse usuário']).toContain(body.message);
}

export async function cancelarCompra(apiRequestContext: APIRequestContext, token: string): Promise<void> {
  const res = await apiRequestContext.delete(`${config.baseURL}${config.endpoints.carrinhos}/cancelar-compra`, {
    headers: { Authorization: token }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(['Registro excluído com sucesso', 'Não foi encontrado carrinho para esse usuário']).toContain(body.message);
}