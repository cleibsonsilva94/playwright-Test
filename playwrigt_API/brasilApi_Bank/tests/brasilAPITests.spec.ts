
import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { getAllBanks, getBankByCode, getBankInvalidCode, allMunicipalitiesState, informationFromAState, InformationFromTheStates, validateResponse, validateStateStructure, validateBankStructure } from './helpers/helperBrasilAPI';
import { brasilAPIData } from './data/brasilAPIData';

// ===============================
// TESTES PARA ENDPOINT DE BANCOS
// ===============================

test.describe('Banco API', () => {

  test('Deve retornar lista completa de bancos', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getAllBanks(request);
    const body: any[] = await validateResponse(res);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    validateBankStructure(body[0]);
  });

  test('Deve retornar banco específico', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getBankByCode(request, brasilAPIData.codBank);
    const body: Record<string, any> = await validateResponse(res);

    expect(body.fullName).toBe('Banco do Brasil S.A.');
  });

  test('Deve retornar erro para código inexistente', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await getBankInvalidCode(request, brasilAPIData.codBank0);
    const body: Record<string, any> = await validateResponse(res, 404);

    expect(body.message).toBe('Código bancário não encontrado');
  });

});

// ==========================
// TESTES PARA ENDPOINT IBGE
// ==========================

test.describe('IBGE API', () => {

  test('Deve retornar lista completa de estados brasileiros', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await InformationFromTheStates(request, brasilAPIData.All);
    const body: any[] = await validateResponse(res);

    expect(Array.isArray(body)).toBeTruthy();
    validateStateStructure(body[0]);
    expect(body.length).toBeGreaterThan(26);
  });

  test('Deve retornar municípios de PE', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await allMunicipalitiesState(request, brasilAPIData.UF);
    const body: any[] = await validateResponse(res);

    expect(body.length).toBeGreaterThan(15);
    expect(body[0]).toHaveProperty('nome');
  });

  test('Deve retornar erro para UF inválida', async ({ request }: { request: APIRequestContext }) => {
    const res: APIResponse = await informationFromAState(request, brasilAPIData.UFerro);
    const body: Record<string, any> = await validateResponse(res, 404);

    expect(body.message).toBe('UF não encontrada.');
  });

  test('Deve responder em menos de 2 segundos', async ({ request }: { request: APIRequestContext }) => {
    const start: number = Date.now();
    const res: APIResponse = await informationFromAState(request, brasilAPIData.UF);
    await validateResponse(res);
    const duration: number = Date.now() - start;

    expect(duration).toBeLessThan(2000);
  });

});