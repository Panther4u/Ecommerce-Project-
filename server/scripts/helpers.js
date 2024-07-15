// helpers.js

// Function to calculate discounted price
const getDiscountedPrice = (price, discount) => {
  const discountedPrice = price * (1 - discount / 100);
  return Number(discountedPrice.toFixed(2)); // Ensure price is formatted to 2 decimal places
};

// Function to format numbers with commas
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

module.exports = { getDiscountedPrice, formatNumber };
