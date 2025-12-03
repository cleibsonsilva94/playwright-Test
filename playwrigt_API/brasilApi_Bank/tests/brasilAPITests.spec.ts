import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { getAllBanks, getBankByCode, getBankInvalidCode, allMunicipalitiesState, informationFromAState, InformationFromTheStates, validateResponse } from './helpers/helperBrasilAPI';
import { brasilAPIData } from './data/brasilAPIData';

test.describe('Testes de API - Bancos', () => {

  test('GET /banks/v1 deve retornar lista completa de bancos', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getAllBanks(request);
    const body: any[] = await validateResponse(res);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[10]).toHaveProperty('name');
    expect(body[10]).toEqual(expect.objectContaining({
      name: expect.any(String),
      code: expect.any(Number)
    }));
  });

  test('GET /banks/v1/:code deve retornar banco específico', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getBankByCode(request, brasilAPIData.cod);
    const body: Record<string, any> = await validateResponse(res);

    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
    expect(body.name).toBe('SANTINVEST S.A. - CFI');
  });

  test('GET /banks/v1/:code deve retornar erro para código inexistente', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getBankInvalidCode(request, brasilAPIData.cod0);
    const body: Record<string, any> = await validateResponse(res, 404);

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Código bancário não encontrado');
  });

});

test.describe('Testes de API - IBGE', () => {

  test('GET /ibge/municipios/v1/:UF deve retornar municípios de PE', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await allMunicipalitiesState(request, brasilAPIData.UF);
    const body: any[] = await validateResponse(res);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(15);
    expect(body[15]).toHaveProperty('nome');
  });

  test('GET /ibge/uf/v1 deve retornar lista completa de estados', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await InformationFromTheStates(request, brasilAPIData.All);
    const body: any[] = await validateResponse(res);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(26);
    expect(body[26]).toHaveProperty('nome');
  });

  // ✅ Usando FOR para testar múltiplos estados
  test.describe('Validação de estados IBGE', () => {
    const estados: string[] = ['PE', 'SP', 'RJ'];

    for (const uf of estados) {
      test(`GET /ibge/uf/v1/${uf} deve retornar informações do estado`, async ({ request }: { request: APIRequestContext }) => {
        const res: APIResponse = await informationFromAState(request, uf);
        const body: Record<string, any> = await validateResponse(res);

        expect(body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          sigla: expect.any(String),
          nome: expect.any(String),
          regiao: expect.objectContaining({
            nome: expect.any(String)
          })
        }));
      });
    }
  });

  test('GET /ibge/uf/v1/:UF deve retornar erro para UF inválida', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await informationFromAState(request, brasilAPIData.UFerro);
    const body: Record<string, any> = await validateResponse(res, 404);

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('UF não encontrada.');
  });

  // ✅ Teste de performance
  test('GET /ibge/uf/v1/:UF deve responder em menos de 2 segundos', async ({ request }: { request: APIRequestContext }) => {
    const start: number = Date.now();
    const res: APIResponse = await informationFromAState(request, brasilAPIData.UF);
    await validateResponse(res);
    const duration: number = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });

});