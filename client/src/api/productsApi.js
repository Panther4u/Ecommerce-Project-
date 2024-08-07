// productsApi.js

import axios from 'axios';
import { API_BASE_URL } from 'src/api/index';

// Example function to fetch products from backend
export const fetchProductsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // Assuming response.data is an array of products
  } catch (error) {
    throw error; // Propagate error to handle in Redux slice
  }
};
