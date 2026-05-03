import axios from "../../../../api/axios.instance";
import { API_BASE_URL } from "../../../../utils/constants";
import { getAuthHeader } from "../../auth/services/auth.utils";

const CART_API = `${API_BASE_URL}/cart`;

console.log("Auth header:", getAuthHeader());

export const getCart = async () => {
  const response = await axios.get(CART_API, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const addToCart = async (item) => {
  const response = await axios.post(`${CART_API}/add`, item, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axios.delete(`${CART_API}/remove/${productId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(`${CART_API}/clear`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  console.log("Udpate Cart Items called");
  console.log(productId, quantity);

  const response = await axios.put(
    `${CART_API}/update/${productId}`,
    { quantity },
    {
      headers: getAuthHeader(),
    },
  );
  return response.data;
};
