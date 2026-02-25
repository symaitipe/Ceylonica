import axios from '../../../core/api/axios.instance';
import { API_BASE_URL } from '../../../core/utils/constants';

const AUTH_API = `${API_BASE_URL}/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${AUTH_API}/register`, userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${AUTH_API}/logout`);
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await axios.post(`${AUTH_API}/refresh`, { token });
  return response.data;
};
