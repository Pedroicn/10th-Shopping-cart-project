const getSavedCartItems = (param) => JSON.parse(localStorage.getItem(param));
// getSavedCartItems('cartItems')
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
