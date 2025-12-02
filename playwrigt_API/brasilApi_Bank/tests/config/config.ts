
export const config = {
  baseURL: 'https://brasilapi.com.br/api',
  BaseURLIBGE: 'https://brasilapi.com.br/api/ibge/municipios/v1',
  endpoints: {
    bank: '/banks/v1',
    bankCode1: '1',
    municipios: '/{siglaUF}?providers=dados-abertos-br,gov,wikipedia',
    usuarios: '',
    produtos: '',
    carrinhos: ''
  }
};