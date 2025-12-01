import { APIRequestContext } from '@playwright/test';
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