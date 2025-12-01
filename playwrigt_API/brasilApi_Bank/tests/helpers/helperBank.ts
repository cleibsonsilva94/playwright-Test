import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { userData } from '../data/bankData';


export async function setupUsuario(): Promise<{ apiRequestContext: APIRequestContext; bank: string }> { 
  const apiRequestContext = await request.newContext(); 
  const res = await apiRequestContext.post(`${config.baseURL}${config.endpoints.usuarios}`, {  /
      
  });
