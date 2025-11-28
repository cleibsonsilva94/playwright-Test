function gerarEmailAleatorio() {
  const prefixo = 'mj';
  const numero = Math.floor(Math.random() * 100);
  return `${prefixo}${numero}@qa.com.br`;
}
export const prodData = {
  nomeDoProduto: 'Máquina Wahl com fio',
  nomeDoProduto2: 'Máquina Wahl sem fio',
  preco: 450, // já como número
  descricao: 'Máquina',
  quantidade: 10,
  nome: 'Michael Jackson',
  nome2: 'Michael Joseph Jackson',
  email: gerarEmailAleatorio(),
  email2: gerarEmailAleatorio(),
  senha: 'teste',
  administrador: 'true'
};

// userData.ts
export const userData = {
  email: 'usuario@teste.com',
  senha: 'senha123'
};
