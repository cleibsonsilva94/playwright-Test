import { expect, APIRequestContext, request } from '@playwright/test';
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