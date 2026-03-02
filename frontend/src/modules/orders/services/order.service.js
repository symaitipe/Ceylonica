import axios from '../../../core/api/axios.instance';
import { API_BASE_URL } from '../../../core/utils/constants';
import { getAuthHeader } from '../../auth/services/auth.utils';

const ORDER_API = `${API_BASE_URL}/orders`;

export const createOrder = async (orderData) => {
  const response = await axios.post(ORDER_API, orderData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(ORDER_API, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`${ORDER_API}/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axios.patch(`${ORDER_API}/${id}/status`, { status }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await axios.delete(`${ORDER_API}/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};
