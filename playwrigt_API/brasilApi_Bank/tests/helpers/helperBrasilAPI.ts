import { APIRequestContext, expect, APIResponse } from '@playwright/test';
import { config } from '../config/config';

// Bancos
export async function getAllBanks(api: APIRequestContext) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}`);
}

export async function getBankByCode(api: APIRequestContext, codBank: string) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);
}

export async function getBankInvalidCode(api: APIRequestContext, codBank: string) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);
}

// IBGE
export async function allMunicipalitiesState(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE}/${siglaUF}/${config.endpoints.municipios}`);
}

export async function InformationFromTheStates(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE2}`);
}

export async function informationFromAState(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE3}/${siglaUF}`);
}

// API Fipe
export async function allCars(api: APIRequestContext, car: string) {
  return await api.get(`${config.baseURL}${config.endpoints.carr}/${car}`);
}

export async function preCars(api: APIRequestContext, carVal: string) {
  return await api.get(`${config.baseURL}${config.endpoints.carrPreç}/${carVal}`);
}

// API Fipe
export async function objects(api: APIRequestContext, objects: string) {
  return await api.get(`${config.Restful}${config.endpoints.allObjects}${objects}`);
}

// validação de retorno
 export async function validateResponse(res: APIResponse, expectedStatus: number = 200): Promise<any> {
  expect(res.status()).toBe(expectedStatus);
  expect(res.headers()['content-type']).toContain('application/json');
  return await res.json();
}

// Validação de estruturas das APIs functions
export async function validateStateStructure(state: Record<string, any>) {
  expect(state).toEqual(expect.objectContaining({
    id: expect.any(Number),
    sigla: expect.any(String),
    nome: expect.any(String),
    regiao: expect.objectContaining({
      nome: expect.any(String)
    })
  }));
}

export async function validateBankStructure(bank: Record<string, any>) {
  expect(bank).toEqual(expect.objectContaining({
    name: expect.any(String),
    code: expect.any(Number)
  }));
}

export async function validateCarrStructure(bank: Record<string, any>) {
  expect(bank).toEqual(expect.objectContaining({
    nome: expect.any(String),
    valor: expect.any(String)
  }));
}

export async function validateObjectsStructure(bank: Record<string, any>) {
  expect(bank).toEqual(expect.objectContaining({
    id: expect.any(String),
    name: expect.any(String)
  }));
}