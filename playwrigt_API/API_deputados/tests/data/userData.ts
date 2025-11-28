function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const userData = {
  nome: '',
  nome2: '',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: '',
  administrador: ''
};