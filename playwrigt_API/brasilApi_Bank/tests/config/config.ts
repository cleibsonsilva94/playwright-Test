
export const config = {
  baseURL: 'https://brasilapi.com.br/api',
  BaseURLIBGE:' https://brasilapi.com.br/api/ibge/municipios/v1',
  BaseURLIBGE2:' https://brasilapi.com.br/api/ibge/uf/v1',
  BaseURLIBGE3:' https://brasilapi.com.br/api/ibge/uf/v1/',
  Restful:'https://api.restful-api.dev/',
  endpoints: {
    bank: '/banks/v1',
    municipios: '?providers=dados-abertos-br,gov,wikipedia',
    bankCode1: '1',
    usuarios: '',
    produtos: '',
    carrinhos: '',
    //car
    carr: '/fipe/marcas/v1/',
    carrPreç: '/fipe/preco/v1/',
    //objects
    allObjects:'objects'
  }
};