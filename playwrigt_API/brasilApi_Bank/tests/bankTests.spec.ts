import { test, expect } from '@playwright/test';
import { bankFull, byCodeBank, invalidCode } from './helpers/helperBank';
import { bankData } from './data/bankData';

test('Todos os bancos', async () => {
  const banks = await bankFull();
  expect(banks).toBeTruthy();
});

test('Banco por código', async () => {
  const SpecificBank = await byCodeBank(bankData.cod);
  expect(SpecificBank.nome).toBe(bankData.nome);
});

test('Buscar com código inexistente', async () => {
  const specificBank = await invalidCode(bankData.cod0);
  expect(specificBank.returnAPI).toBe(bankData.message);
});