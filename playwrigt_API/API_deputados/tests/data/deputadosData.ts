function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}

export const deputadosData = {
  nome: 'Eduardo',
  nome2: '',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  estado: 'PE',
  Partido: 'PT'
};