import axios from "../../../../api/axios.instance";
import { API_BASE_URL } from "../../../../utils/constants";
import { getAuthHeader } from "../../auth/services/auth.utils";

const PAYMENT_API = `${API_BASE_URL}/payments`;

export const createPayment = async (amount) => {
  const response = await axios.post(
    PAYMENT_API,
    {
      amount,
      currency: "lkr",
    },
    { headers: getAuthHeader() },
  );
  return response.data;
};

export const confirmPayment = async (paymentIntentId) => {
  const response = await axios.post(
    `${PAYMENT_API}/confirm/${paymentIntentId}`,
    {},
    { headers: getAuthHeader() },
  );
  return response.data;
};

export const linkPaymentToOrder = async (paymentIntentId, orderId) => {
  const response = await axios.patch(
    `${PAYMENT_API}/link-order/${paymentIntentId}`,
    { orderId },
    { headers: getAuthHeader() },
  );
  return response.data;
};
