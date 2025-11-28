function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const userData = {
  nome: 'Michael Jackson',
  nome2: 'Michael Joseph Jackson',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: 'teste',
  administrador: 'true'
};