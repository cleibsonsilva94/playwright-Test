function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const brasilAPIData = {
  cod: '539',
  cod0: '00',
  UF: 'PE',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
};
