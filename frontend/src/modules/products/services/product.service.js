import axios from "../../../core/api/axios.instance";
import { API_BASE_URL } from "../../../core/utils/constants";

const PRODUCT_API = `${API_BASE_URL}/products`;

export const getAllProducts = async (params) => {
  const response = await axios.get(`${PRODUCT_API}/productlist`, { params });
  console.log("API response:", response.data); // Add this
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${PRODUCT_API}/${id}`);
  return response.data;
};

export const createProduct = async (productData, token) => {
  const response = await axios.post(PRODUCT_API, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (id, productData, token) => {
  const response = await axios.put(`${PRODUCT_API}/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (id, token) => {
  const response = await axios.delete(`${PRODUCT_API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${PRODUCT_API}/search`, {
    params: { q: query },
  });
  return response.data;
};
