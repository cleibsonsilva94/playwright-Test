import { APIRequestContext, request, expect } from '@playwright/test';
import { config } from '../config/config';
import { bankData } from '../data/bankData';


export async function bankFull(): Promise<{apiRequestContext: APIRequestContext}> {
  const apiRequestContext = await request.newContext(); 
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.bank}`, {
  });

  expect(res.status()).toBe(200);
  const body = await res.json();  
  return {apiRequestContext};
}

export async function byCodeBank(codBank: string): Promise<{ apiRequestContext: APIRequestContext; nome: string }> {
  const apiRequestContext = await request.newContext();
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);

  expect(res.status()).toBe(200);

  const body = await res.json();
  return { apiRequestContext, nome: body.name };
}

export async function invalidCode(codBank: string): Promise<{ apiRequestContext: APIRequestContext; returnAPI: string }> {
  const apiRequestContext = await request.newContext();
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.bank}/${codBank}`);

  expect(res.status()).toBe(404);

  const body = await res.json();
  return { apiRequestContext, returnAPI: body.message };
}
