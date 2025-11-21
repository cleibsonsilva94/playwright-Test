import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario } from './helpers/userHelper.js';
import { prodData } from './data/prodData.ts';
import { userData } from './data/userData.js';

let apiRequestContext;
let idUsuario;
let authorization;

test.beforeAll(async () => {
  const setup = await setupUsuario();
  apiRequestContext = setup.apiRequestContext;
  idUsuario = setup.idUsuario;
});

test('Cadastrar Produto(s)', async () => {
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

 
  const response = await apiRequestContext.post('https://serverest.dev/produtos', {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      nome: prodData.nomeDoProduto,
      descricao: prodData.descricao,
      preco: prodData.preco,
      quantidade: prodData.quantidade
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.message).toBe('Cadastro realizado com sucesso');
});

test.afterAll(async () => {
  await teardownUsuario();
});

















































/*
------------------------------------------------------------
IMPORTAÇÕES
------------------------------------------------------------
- import { test, expect } from '@playwright/test';
  -> Importa funções do Playwright Test:
     - test: para definir casos de teste
     - expect: para validar resultados

- import { setupUsuario, teardownUsuario } from './helpers/userHelper.js';
  -> Funções auxiliares:
     - setupUsuario: cria usuário antes dos testes
     - teardownUsuario: remove usuário depois dos testes

- import { prodData } from './data/prodData.ts';
  -> Dados do produto (nome, descrição, preço, quantidade)

- import { userData } from './data/userData.js';
  -> Dados do usuário (email, senha) usados nos testes

------------------------------------------------------------
VARIÁVEIS GLOBAIS
------------------------------------------------------------
- let apiRequestContext;
  -> Armazena contexto para requisições HTTP

- let idUsuario;
  -> Guarda ID do usuário criado para usar nos testes

- let authorization;
  -> Será usado para armazenar token de autenticação

------------------------------------------------------------
HOOK BEFORE ALL
------------------------------------------------------------
- test.beforeAll(async () => { ... });
  -> Executa antes de todos os testes
  -> Cria usuário e inicializa variáveis globais:
     - apiRequestContext: contexto para requisições
     - idUsuario: ID do usuário criado

------------------------------------------------------------
TESTE: CADASTRAR PRODUTO(S)
------------------------------------------------------------
Passo 1: Login do usuário
- Faz POST para /login com email e senha do usuário
- Valida:
  -> Status HTTP = 200
  -> Captura token de autorização

Passo 2: Cadastro do produto
- Faz POST para /produtos com dados do produto
- Inclui token no header (Authorization: Bearer <token>)
- Valida:
  -> Status HTTP = 201 (Created)
  -> Mensagem = "Cadastro realizado com sucesso"

------------------------------------------------------------
HOOK AFTER ALL
------------------------------------------------------------
- test.afterAll(async () => { ... });
  -> Executa depois de todos os testes
  -> Remove usuário criado para não deixar dados sujos na API
*/