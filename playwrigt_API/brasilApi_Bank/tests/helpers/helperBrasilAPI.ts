import { APIRequestContext, expect, APIResponse } from '@playwright/test';
import { config } from '../config/config';

export async function getAllBanks(api: APIRequestContext) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}`);
}

export async function getBankByCode(api: APIRequestContext, codBank: string) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);
}

export async function getBankInvalidCode(api: APIRequestContext, codBank: string) {
  return await api.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);
}

export async function allMunicipalitiesState(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE}/${siglaUF}/${config.endpoints.municipios}`);
}

export async function InformationFromTheStates(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE2}`);
}

export async function informationFromAState(api: APIRequestContext, siglaUF: string) {
  return await api.get(`${config.BaseURLIBGE3}/${siglaUF}`);
}

 export async function validateResponse(res: APIResponse, expectedStatus: number = 200): Promise<any> {
  expect(res.status()).toBe(expectedStatus);
  expect(res.headers()['content-type']).toContain('application/json');
  return await res.json();
}