function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const brasilAPIBank = {
  codBank: '001',
  codBank0: '00',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
};

export const brasilAPIUF = {
  UF: 'PE',
  UFerro: 'LL',
  all: '',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
}

export const brasilAPICarr = {
  allVeiculos: '',
  carr: 'carros',
  motos: 'motos',
  caminhoes:'caminhoes',
  carr2: 'LL',
  codigoFipeFiat: '001004-9',
  codigoFipe2Creta: '015202-1',
  codigoFipe2Veloster: '015079-7',
  all: '',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
}

export const restful = {
  allObjects: '',
  IdObjects: '1',
  object2: '',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
}