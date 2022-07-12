const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove()
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const insertProductInCart = async (event) => {
  const cartList = document.querySelector('.cart__items');
  const parent = event.target.parentNode;
  const productId = parent.firstChild.innerText;
  const { id, title, price } = await fetchItem(productId);
  const product = {
    sku: id,
    name: title,
    salePrice: price,
  };
  cartList.appendChild(createCartItemElement(product));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  button.addEventListener('click', insertProductInCart);
  section.appendChild(button);
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const insertInformation = async () => {
  const items = document.querySelector('.items');
  const information = await fetchProducts('computador');
  const results = await information.results;
  results.forEach(({ id, title, thumbnail }) => {
    items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

window.onload = () => { insertInformation(); };
