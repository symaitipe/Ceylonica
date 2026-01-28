import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getAuthHeader } from '../utils/auth';

const CART_API = `${API_BASE_URL}/cart`;

export const getCart = async () => {
  const response = await axios.get(CART_API, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await axios.post(`${CART_API}/items`, { productId, quantity }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await axios.put(`${CART_API}/items/${itemId}`, { quantity }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${CART_API}/items/${itemId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(CART_API, {
    headers: getAuthHeader()
  });
  return response.data;
};
