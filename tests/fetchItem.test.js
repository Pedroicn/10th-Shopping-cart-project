require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('Verifica se fetch é chamada quando a função recebe o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error("You must provide an url"));
  });

});
