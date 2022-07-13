// const saveCartItems = require("./helpers/saveCartItems");
const cartList = document.querySelector('.cart__items');
const buttonClear = document.querySelector('.empty-cart');
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

const sumPrices = () => {
  const li = document.querySelectorAll('.cart__item');
  const totalHTML = document.querySelector('.total-price');
  const arrayPrices = [];
  li.forEach((element) => arrayPrices.push(element.innerText.split('$')[1]));
  const total = arrayPrices.reduce((acc, crr) => parseFloat(acc) + parseFloat(crr), 0);
  totalHTML.innerText = total;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(JSON.stringify(cartList.innerHTML));
  sumPrices();
};

cartList.addEventListener('click', cartItemClickListener);

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const insertProductInCart = async (event) => {
  const parent = event.target.parentNode;
  const productId = parent.firstChild.innerText;
  const { id, title, price } = await fetchItem(productId);
  const product = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const li = createCartItemElement(product);
  cartList.appendChild(li);
  saveCartItems(JSON.stringify(cartList.innerHTML));
  sumPrices();
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

buttonClear.addEventListener('click', () => {
  const totalHTML = document.querySelector('.total-price');
  cartList.innerHTML = '';
  totalHTML.innerHTML = 0;
});

window.onload = () => {
  insertInformation();
  cartList.innerHTML = getSavedCartItems('cartItems');
  sumPrices();
};
