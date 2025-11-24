
import { test, expect } from '@playwright/test';
import { setupUsuario } from './helpers/userHelper.js';
import { prodData } from './data/prodData.ts';
import { userData } from './data/userData.js';

let apiRequestContext;

test.beforeAll(async () => {
  const setup = await setupUsuario();
  apiRequestContext = setup.apiRequestContext;
});

test('Cadastrar e buscar produto por ID', async () => {
  // 1. Login para obter token
  const loginResponse = await apiRequestContext.post('https://serverest.dev/login', {
    ignoreHTTPSErrors: true,
    data: {
      email: userData.email,
      password: userData.senha
    }
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  const token = loginBody.authorization;

  // 2. Cadastrar produto
  const cadastroResponse = await apiRequestContext.post('https://serverest.dev/produtos', {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `${token}`
    },
    data: {
      nome: prodData.nomeDoProduto2,
      descricao: prodData.descricao,
      preco: prodData.preco,
      quantidade: prodData.quantidade
    }
  });

  expect(cadastroResponse.status()).toBe(201);
  const cadastroBody = await cadastroResponse.json();
  expect(cadastroBody.message).toBe('Cadastro realizado com sucesso');

  const produtoId = cadastroBody._id;
  expect(produtoId).toBeTruthy();
  
  const buscaResponse = await apiRequestContext.get(`https://serverest.dev/produtos/${produtoId}`, {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `${token}`
    }
  });

  expect(buscaResponse.status()).toBe(200);
  const buscaBody = await buscaResponse.json();

  // 4. Validações
  expect(buscaBody.nome).toBe(prodData.nomeDoProduto2);
  expect(buscaBody.descricao).toBe(prodData.descricao);
  expect(buscaBody.preco).toBe(prodData.preco);
  expect(buscaBody.quantidade).toBe(prodData.quantidade);
});
