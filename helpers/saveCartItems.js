// const getSavedCartItems = require("./getSavedCartItems");

const saveCartItems = (argument) => localStorage.setItem('cartItems', argument);
// saveCartItems(cartItems)
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
