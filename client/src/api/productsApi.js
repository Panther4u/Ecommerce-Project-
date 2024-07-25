// productsApi.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your API base URL

// Example function to fetch products from backend
export const fetchProductsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // Assuming response.data is an array of products
  } catch (error) {
    throw error; // Propagate error to handle in Redux slice
  }
};
