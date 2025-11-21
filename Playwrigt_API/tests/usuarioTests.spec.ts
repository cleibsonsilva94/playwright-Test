import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario } from './helpers/userHelper.js';
import { userData } from './data/userData.js';

let apiRequestContext;
let idUsuario;

test.beforeEach(async () => { // Tradução: Antes de cada
  const setup = await setupUsuario();
  apiRequestContext = setup.apiRequestContext;
  idUsuario = setup.idUsuario;
});

test.afterEach(async () => { //Depois de cada. 
  await teardownUsuario(idUsuario);
});

test('Login Usuário', async () => {
  const response = await apiRequestContext.post('https://serverest.dev/login', {
    ignoreHTTPSErrors: true,
    data: {
      email: userData.email,
      password: userData.senha
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe('Login realizado com sucesso');
});

test('Buscar usuário por ID', async () => {
  const response = await apiRequestContext.get(`https://serverest.dev/usuarios/${idUsuario}`, {
    ignoreHTTPSErrors: true
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.nome).toBe(userData.nome);
  expect(body.email).toBe(userData.email);
  expect(body._id).toBe(`${idUsuario}`);
});

test('Atualização de Usuário', async () => {
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

  const updateResponse = await apiRequestContext.put(`https://serverest.dev/usuarios/${idUsuario}`, {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      nome: userData.nome2,
      email: userData.email2,
      password: userData.senha,
      administrador: userData.administrador
    }
  });

  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  expect(updateBody.message).toBe('Registro alterado com sucesso');
  const getResponse = await apiRequestContext.get(`https://serverest.dev/usuarios/${idUsuario}`, {
    ignoreHTTPSErrors: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  expect(getBody.nome).toBe(userData.nome2);
  expect(getBody.email).toBe(userData.email2);
});



















/*
------------------------------------------------------------
IMPORTAÇÕES
------------------------------------------------------------
- import { request, expect } from '@playwright/test';
  -> request: cria contexto para requisições HTTP
  -> expect: valida respostas da API

- import { userData } from '../data/userData.js';
  -> Dados base do usuário (nome, senha, administrador)

------------------------------------------------------------
VARIÁVEIS GLOBAIS
------------------------------------------------------------
- let apiRequestContext;
  -> Armazena contexto para requisições HTTP

------------------------------------------------------------
FUNÇÃO setupUsuario()
------------------------------------------------------------
Objetivo:
- Criar usuário antes do teste
- Gerar e-mail aleatório para evitar duplicidade

Passos:
1. Cria novo contexto de requisição: request.newContext()
2. Gera e-mail único usando timestamp: qauser<timestamp>@teste.com
3. Atualiza userData.email com e-mail gerado
4. Faz POST para /usuarios com dados do usuário
5. Valida:
   -> Status HTTP = 201
   -> Mensagem = "Cadastro realizado com sucesso"
6. Retorna:
   -> apiRequestContext (para usar nos testes)
   -> idUsuario (para exclusão posterior)

------------------------------------------------------------
FUNÇÃO teardownUsuario(idUsuario)
------------------------------------------------------------
Objetivo:
- Excluir usuário após o teste

Passos:
1. Verifica se idUsuario existe
2. Faz DELETE para /usuarios/{id}
3. Valida:
   -> Status HTTP = 200
   -> Mensagem = "Registro excluído com sucesso"
4. Exibe no console:
   -> E-mail do usuário removido
*/