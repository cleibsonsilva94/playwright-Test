import { test, expect, request } from '@playwright/test';
import { cadastrarProduto, buscarProduto, excluirProduto } from './helpers/helpersProduto.js';
import {  setupUsuario, teardownUsuario, loginUsuario, buscarUsuario, atualizarUsuario } from './helpers/helperUser';
import { prodData } from './data/prodData.js';
import { userData } from './data/userData';

 let apiRequestContext: any; //Qualquer valor
 let idUsuario: string;

  test.beforeEach(async () => {
    const setup = await setupUsuario();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;
  });

  test.afterEach(async () => {
    await teardownUsuario(apiRequestContext, idUsuario);
  });

test('Cadastrar e buscar produto por ID', async ({ request }) => {
  // 1. Login
  const token = await loginUsuario(request, userData.email, userData.senha)
    expect(token).toBeTruthy();
    headers: { Authorization: token }

  // 2. Cadastro
  const produtoId = await cadastrarProduto(request, token, {
    nome: prodData.nomeDoProduto2,
    descricao: prodData.descricao,
    preco: prodData.preco,
    quantidade: prodData.quantidade
  });

  // 3. Busca
  const produto = await buscarProduto(request, token, produtoId);

  // 4. Validações
  expect(produto.nome).toBe(prodData.nomeDoProduto2);
  expect(produto.descricao).toBe(prodData.descricao);
  expect(produto.preco).toBe(prodData.preco);
  expect(produto.quantidade).toBe(prodData.quantidade);

  // 5. Exclusão
  await excluirProduto(request, token, produtoId);
});