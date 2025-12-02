import { test, expect } from '@playwright/test';
import { getAllBanks, getBankByCode, getBankInvalidCode, allMunicipalitiesState, InformationFromTheStates, informationFromAState } from './helpers/helperBrasilAPI';
import { brasilAPIData } from './data/brasilAPIData';

test.describe('Testes de API - Bancos', () => {

  test('Deve retornar lista completa de bancos com status 200', async ({ request }) => { 
    const res = await getAllBanks(request);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[10]).toHaveProperty('name');
  });

  test('Deve retornar banco específico pelo código', async ({ request }) => {
    const res = await getBankByCode(request, brasilAPIData.cod);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
    expect(body.name).toBe('SANTINVEST S.A. - CFI');
  });

  test('Deve retornar erro ao buscar código inexistente', async ({ request }) => {
    const res = await getBankInvalidCode(request, brasilAPIData.cod0);
    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Código bancário não encontrado');
  });

});

test.describe('Testes de API - IBGE', () => {

  test('Deve retornar informações todos os municípios de uma unidade federativa (PE)', async ({ request }) => { 
    const res = await allMunicipalitiesState(request, brasilAPIData.UF);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(15);
    expect(body[15]).toHaveProperty('nome');

  });

  test('Deve retornar informações de todos os estados', async ({ request }) => { 
    const res = await InformationFromTheStates(request, brasilAPIData.All);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(26);
    expect(body[26]).toHaveProperty('nome');

  });

   test('Deve retornar informações de um estado (PE)', async ({ request }) => { 
    const res = await informationFromAState(request, brasilAPIData.UF);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('nome');
    expect(body.nome).toBe('Pernambuco');

    });

    test('Não deve retornar informações de um estado (PE)', async ({ request }) => { 
    const res = await informationFromAState(request, brasilAPIData.UFerro);
    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body).toHaveProperty('name');
    expect(body.message).toBe('UF não encontrada.');

    });
  });