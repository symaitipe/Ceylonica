import axios from '../../../core/api/axios.instance';
import { API_BASE_URL } from '../../../core/utils/constants';

const mapProductDTO = (dto) => {
  if (!dto) return null;
  return {
    id: dto.productId,
    name: dto.productName,
    description: dto.productDescription,
    price: dto.productPrice,
    category: dto.categoryId,
    imageUrl: dto.cardImageUrls && dto.cardImageUrls.length > 0 ? dto.cardImageUrls[0] : null,
    cardImageUrls: dto.cardImageUrls || [],
    detailImageUrls: dto.detailImageUrls || [],
    inStock: true // Backend does not have stock property
  };
};

export const getAllProducts = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/productlist`, { params });
  return (response.data || []).map(mapProductDTO);
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/product/${id}`);
  return mapProductDTO(response.data);
};

export const createProduct = async (productData, token) => {
  const formData = new FormData();
  formData.append('productName', productData.name);
  formData.append('productDescription', productData.description);
  formData.append('productPrice', productData.price);
  if (productData.category) formData.append('categoryId', productData.category);

  if (productData.cardImage) {
    formData.append('cardImages', productData.cardImage);
  }
  if (productData.detailImages && productData.detailImages.length > 0) {
    productData.detailImages.forEach(img => formData.append('detailImages', img));
  }

  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.post(`${API_BASE_URL}/addproduct`, formData, config);
  return mapProductDTO(response.data);
};

export const updateProduct = async (id, productData, token) => {
  const formData = new FormData();
  formData.append('productId', id);
  formData.append('productName', productData.name);
  formData.append('productDescription', productData.description);
  formData.append('productPrice', productData.price);
  if (productData.category) formData.append('categoryId', productData.category);

  if (productData.cardImage) {
    formData.append('cardImages', productData.cardImage);
  }
  if (productData.detailImages && productData.detailImages.length > 0) {
    productData.detailImages.forEach(img => formData.append('detailImages', img));
  }

  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.put(`${API_BASE_URL}/updateproduct`, formData, config);
  return mapProductDTO(response.data);
};

export const deleteProduct = async (id, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.delete(`${API_BASE_URL}/product/${id}`, config);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/productsearch`, { params: { keyword: query } });
  return (response.data || []).map(mapProductDTO);
};
