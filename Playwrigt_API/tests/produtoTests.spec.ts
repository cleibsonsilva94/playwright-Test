import { test, expect } from '@playwright/test';
import { setupUsuario } from './helpers/userHelper.js';
import { prodData } from './data/prodData.ts';
import { userData } from './data/userData.js';
import { teardownProduto } from './helpers/helpersProduto.ts';

let apiRequestContext;
let idProduto;
let token;

test.beforeAll(async () => {
  const setup = await setupUsuario();
  apiRequestContext = setup.apiRequestContext;
});

test('Cadastrar e buscar produto por ID', async () => {
  const loginResponse = await apiRequestContext.post('https://serverest.dev/login', {
    ignoreHTTPSErrors: true,
    data: {
      email: userData.email,
      password: userData.senha
    }
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  token = loginBody.authorization; // agora global

  // 2. Cadastro do produto
  const cadastroResponse = await apiRequestContext.post('https://serverest.dev/produtos', {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `${token}`
    },
    data: {
      nome: prodData.nomeDoProduto2,
      descricao: prodData.descricao,
      preco: Number(prodData.preco), // evita erro "450" vs 450
      quantidade: prodData.quantidade
    }
  });

  expect(cadastroResponse.status()).toBe(201);
  const cadastroBody = await cadastroResponse.json();
  expect(cadastroBody.message).toBe('Cadastro realizado com sucesso');

  idProduto = cadastroBody._id; // agora global
  expect(idProduto).toBeTruthy();

  // 3. Busca do produto
  const buscaResponse = await apiRequestContext.get(`https://serverest.dev/produtos/${idProduto}`, {
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

test.afterEach(async () => {
  await teardownProduto(apiRequestContext, idProduto, token);
});