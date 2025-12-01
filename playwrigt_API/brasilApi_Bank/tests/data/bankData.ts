function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const bankData = {
  nome: 'SANTINVEST S.A. - CFI',
  cod: '539',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
};
