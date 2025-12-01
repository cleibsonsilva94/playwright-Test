function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const bankData = {
  nome: 'SANTINVEST S.A. - CFI',
  cod: '539',
  cod0: '00',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  message: 'Código bancário não encontrado',
  senha: '',
  administrador: ''
};
