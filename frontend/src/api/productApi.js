import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const PRODUCT_API = `${API_BASE_URL}/products`;

export const getAllProducts = async (params) => {
  const response = await axios.get(PRODUCT_API, { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${PRODUCT_API}/${id}`);
  return response.data;
};

export const createProduct = async (productData, token) => {
  const response = await axios.post(PRODUCT_API, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateProduct = async (id, productData, token) => {
  const response = await axios.put(`${PRODUCT_API}/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteProduct = async (id, token) => {
  const response = await axios.delete(`${PRODUCT_API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${PRODUCT_API}/search`, { params: { q: query } });
  return response.data;
};
