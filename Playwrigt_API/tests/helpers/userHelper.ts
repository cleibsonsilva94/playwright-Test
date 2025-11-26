import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { userData } from '../data/userData';


export async function setupUsuario(): Promise<{ apiRequestContext: APIRequestContext; idUsuario: string }> { // Cria um novo contexto de requisição HTTP do Playwright."ambiente isolado" para fazer chamadas à API. usado para todas as requisições (POST, GET, DELETE) dentro do teste
  const apiRequestContext = await request.newContext(); 
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.usuarios}`, {  // chamada HTTP POST para criar um usuário. u a baseURL do config + o endpoint /usuarios para montar a URL completa. Depende do contexto criado na linha anterior para executar a requisição.
      data: {
      nome: userData.nome,
      email: userData.email,
      password: userData.senha,
      administrador: userData.administrador
    }
  });

  expect(res.status()).toBe(201); // Valida que a resposta da API tem status 201 (Created). Se não for 201, o teste falha aqui.
  const body = await res.json();  // Converte a resposta da API para JSON para acessar os dados retornados.
  return { apiRequestContext, idUsuario: body._id }; // - O contexto (para usar em outras funções, como login ou teardown).  O ID do usuário criado (para buscar ou excluir depois).
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
  return await res.json(); //Passa para quem chamou a função a resposta em formato Json. 
}

export async function atualizarUsuario(apiRequestContext: APIRequestContext, idUsuario: string, dados: any): Promise<void> {
  const res = await apiRequestContext.put(`${config.baseURL}${config.endpoints.usuarios}/${idUsuario}`, {
    data: dados
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('Registro alterado com sucesso');
}

/*
==============
📌 EXPLICAÇÃO
==============
 IMPORTAÇÕES
- expect → Função do Playwright usada para validar respostas (status, mensagens).
- APIRequestContext → Representa o contexto para requisições HTTP.
- request → Usado para criar um novo contexto de requisição (isolado para cada teste).
- config → Arquivo central com baseURL e endpoints (evita repetição de URLs).
- userData → Dados do usuário (nome, email, senha, administrador).
----------------------------------------------------------
 FUNÇÃO: setupUsuario()
Objetivo:
- Criar um usuário antes dos testes e retornar:
  → apiRequestContext (para fazer requisições)
  → idUsuario (para identificar o usuário criado)

Passos:
1. Cria um novo contexto de requisição:
   const apiRequestContext = await request.newContext();
   → Cada teste tem seu próprio contexto isolado.

2. Faz POST para /usuarios com os dados do userData:
   apiRequestContext.post(`${config.baseURL}${config.endpoints.usuarios}`, { data: {...} });

3. Valida:
   expect(res.status()).toBe(201);
   → Garante que o usuário foi criado com sucesso.

4. Converte resposta para JSON:
   const body = await res.json();

5. Retorna objeto:
   { apiRequestContext, idUsuario: body._id }
----------------------------------------------------------
FUNÇÃO: teardownUsuario()
Objetivo:
- Remover o usuário criado após os testes (limpeza de dados).

Passos:
1. Verifica se idUsuario existe.
2. Faz DELETE para /usuarios/{idUsuario}.
3. Valida:
   expect(res.status()).toBe(200);
   → Exclusão bem-sucedida.
4. Valida mensagem:
   expect(body.message).toBe('Registro excluído com sucesso');
----------------------------------------------------------
FUNÇÃO: loginUsuario()
Objetivo:
- Autenticar o usuário e obter token JWT.

Passos:
1. Faz POST para /login com email e senha.
2. Valida status 200.
3. Retorna body.authorization (token JWT).

Por que usar token?
→ Necessário para acessar rotas protegidas (ex.: produtos).
----------------------------------------------------------
FUNÇÃO: buscarUsuario()
Objetivo:
- Consultar os detalhes de um usuário pelo ID.

Passos:
1. Faz GET para /usuarios/{id}.
2. Valida status 200.
3. Retorna dados do usuário.
----------------------------------------------------------
FUNÇÃO: atualizarUsuario()
Objetivo:
- Alterar dados do usuário existente.

Passos:
1. Faz PUT para /usuarios/{id} com novos dados.
2. Valida status 200.
3. Valida mensagem "Registro alterado com sucesso".
----------------------------------------------------------
FUNÇÕES USADAS E POR QUÊ
- request.newContext() → Cria contexto isolado para requisições.
- apiRequestContext.post(), get(), put(), delete() → Métodos HTTP para interagir com a API.
- expect() → Validações para garantir que cada etapa foi bem-sucedida.
- await res.json() → Converte resposta da API para objeto JavaScript.
- headers: { Authorization: token } → Necessário para autenticação nas rotas protegidas.
*/