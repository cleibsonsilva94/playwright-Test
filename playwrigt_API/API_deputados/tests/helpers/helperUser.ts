import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { deputadosData } from '../data/deputadosData';


export async function porNome(): Promise<{ apiRequestContext: APIRequestContext; nome: string }> { 
  const apiRequestContext = await request.newContext(); 
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.deputados}`, { 
      data: {
      nome: deputadosData.nome
      }
  });

  expect(res.status()).toBe(201); 
  const body = await res.json();
  return { apiRequestContext, nome: body.nome };
}