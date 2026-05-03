import axios from "../../../../api/axios.instance";
import { API_BASE_URL } from "../../../../utils/constants";
import { getAuthHeader } from "../../auth/services/auth.utils";

const REVIEW_API = `${API_BASE_URL}/reviews`;

export const getReviews = async (productId) => {
  const response = await axios.get(`${REVIEW_API}/${productId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await axios.post(REVIEW_API, reviewData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const editReview = async (reviewId, reviewData) => {
  const response = await axios.put(`${REVIEW_API}/${reviewId}`, reviewData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await axios.delete(`${REVIEW_API}/${reviewId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
