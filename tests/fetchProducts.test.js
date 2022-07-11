require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Checks if fetchProdcuts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se "fetch" é chamada ao chamar a função "fetchProdcuts" com o argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const esperado = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(esperado);
  });

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'))
  });
});
