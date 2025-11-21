import { request, expect } from '@playwright/test';
import { userData } from '../data/userData.js';

let apiRequestContext;

export async function setupUsuario() {
  apiRequestContext = await request.newContext();

  const response = await apiRequestContext.post('https://serverest.dev/usuarios', {
    data: {
      nome: userData.nome,
      email: userData.email,
      password: userData.senha,
      administrador: userData.administrador
    }
  });

  const body = await response.json();
  expect(response.status()).toBe(201);
  expect(body.message).toBe('Cadastro realizado com sucesso');

  return { apiRequestContext, idUsuario: body._id };
}

export async function teardownUsuario(idUsuario) {
  if (idUsuario) {
    const deleteResponse = await apiRequestContext.delete(`https://serverest.dev/usuarios/${idUsuario}`);
    const deleteBody = await deleteResponse.json();
    expect(deleteResponse.status()).toBe(200);
    expect(deleteBody.message).toBe('Registro excluído com sucesso');
    console.log(`Usuário ${userData.email} removido com sucesso.`);
  }
}

export async function loginUsuario(apiRequestContext, email, senha) {
  const response = await apiRequestContext.post('https://serverest.dev/login', {
    data: { email, password: senha }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  return body.authorization;
}


/*
------------------------------------------------------------
IMPORTAÇÕES
------------------------------------------------------------
- import { request, expect } from '@playwright/test';
  -> request: usado para criar um novo contexto de requisição HTTP
  -> expect: usado para validar respostas (status, mensagens)

- import { userData } from '../data/userData.js';
  -> Dados do usuário (nome, email, senha, administrador)
  -> Esses dados são usados para criar e autenticar o usuário nos testes

------------------------------------------------------------
VARIÁVEL GLOBAL
------------------------------------------------------------
- let apiRequestContext;
  -> Armazena o contexto de requisição HTTP
  -> Esse contexto é criado no setup e reutilizado no teardown e login

------------------------------------------------------------
FUNÇÃO: setupUsuario()
------------------------------------------------------------
Objetivo:
- Criar um usuário antes dos testes
- Retornar:
  -> apiRequestContext (para fazer requisições)
  -> idUsuario (para identificar o usuário criado)

Passos:
1. Cria um novo contexto de requisição:
   apiRequestContext = await request.newContext();

2. Faz POST para /usuarios com os dados do userData:
   - nome, email, senha, administrador

3. Valida:
   -> Status HTTP = 201 (Created)
   -> Mensagem = "Cadastro realizado com sucesso"

4. Retorna objeto:
   { apiRequestContext, idUsuario: body._id }

------------------------------------------------------------
FUNÇÃO: teardownUsuario(idUsuario)
------------------------------------------------------------
Objetivo:
- Remover o usuário criado após os testes
- Evitar dados "sujos" na API

Passos:
1. Verifica se idUsuario existe
2. Faz DELETE para /usuarios/{idUsuario}
3. Valida:
   -> Status HTTP = 200
   -> Mensagem = "Registro excluído com sucesso"
4. Exibe log no console confirmando remoção

------------------------------------------------------------
FUNÇÃO: loginUsuario(apiRequestContext, email, senha)
------------------------------------------------------------
Objetivo:
- Autenticar o usuário e obter token de autorização

Passos:
1. Faz POST para /login com email e senha
2. Valida:
   -> Status HTTP = 200
3. Retorna:
   -> body.authorization (token JWT)

------------------------------------------------------------
COMUNICAÇÃO ENTRE FUNÇÕES
------------------------------------------------------------
- setupUsuario():
   -> Cria usuário e retorna apiRequestContext + idUsuario
   -> Esse contexto é usado nos testes para fazer requisições

- teardownUsuario():
   -> Usa apiRequestContext (criado no setup) para deletar o usuário

- loginUsuario():
   -> NÃO depende diretamente do setupUsuario()
   -> Mas precisa do apiRequestContext
   -> Usa email e senha do userData para autenticar e gerar token

------------------------------------------------------------
RESUMO DA RELAÇÃO COM OS TESTES
------------------------------------------------------------
- Nos testes:
   -> test.beforeEach chama setupUsuario()
      - Cria usuário e guarda apiRequestContext e idUsuario
   -> Cada teste usa apiRequestContext para fazer requisições
   -> Quando precisa de token, chama loginUsuario(apiRequestContext, email, senha)
   -> test.afterEach chama teardownUsuario(idUsuario)
      - Remove usuário criado
*/
