import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { Points } from '../data/data';


export async function olaMundo(): Promise<{ apiRequestContext: APIRequestContext }> { // Cria um novo contexto de requisição HTTP do Playwright."ambiente isolado" para fazer chamadas à API. usado para todas as requisições (POST, GET, DELETE) dentro do teste
  const apiRequestContext = await request.newContext(); 
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.olaMundo}`, {  // chamada HTTP POST para criar um usuário. u a baseURL do config + o endpoint /usuarios para montar a URL completa. Depende do contexto criado na linha anterior para executar a requisição.
  });

  expect(res.status()).toBe(200); // Valida que a resposta da API tem status 201 (Created). Se não for 201, o teste falha aqui.
  return { apiRequestContext }; // - O contexto (para usar em outras funções, como login ou teardown).  O ID do usuário criado (para buscar ou excluir depois).
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