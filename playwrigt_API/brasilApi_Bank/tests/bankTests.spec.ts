import { test, expect } from '@playwright/test';
import { getAllBanks, getBankByCode, getBankInvalidCode } from './helpers/helperBank';
import { bankData } from './data/bankData';

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
    const res = await getBankByCode(request, bankData.cod);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
    expect(body.name).toBe('SANTINVEST S.A. - CFI');
  });

  test('Deve retornar erro ao buscar código inexistente', async ({ request }) => {
    const res = await getBankInvalidCode(request, bankData.cod0);
    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Código bancário não encontrado');
  });

});