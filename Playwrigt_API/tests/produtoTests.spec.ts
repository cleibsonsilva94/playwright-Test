import { test, expect } from '@playwright/test';
import { login, cadastrarProduto, buscarProduto, excluirProduto } from './helpers/helpersProduto.js';
import { prodData } from './data/prodData.js';

test('Cadastrar e buscar produto por ID', async ({ request }) => {
  // 1. Login
  const token = await login(request);

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