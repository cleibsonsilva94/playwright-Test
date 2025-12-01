import { expect, APIRequestContext, request } from '@playwright/test';
import { config } from '../config/config';
import { deputadosData } from '../data/deputadosData';

export async function porNome(): Promise<{ apiRequestContext: APIRequestContext; nome: string }> {
  const apiRequestContext = await request.newContext();
  
  const res = await apiRequestContext.get(`${config.baseURL}${config.endpoints.deputados}`, {
    params: { nome: deputadosData.nome }
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  const nomeDeputado = body.dados[0]?.nome || '';

  return { apiRequestContext, nome: nomeDeputado };
}