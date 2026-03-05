import axios from "../../../core/api/axios.instance";

const PAYMENT_API = "http://localhost:8086/api/payments";

// Step 1 — Call your Spring Boot payment-service
// Creates a Stripe PaymentIntent and returns clientSecret
export const createPaymentIntent = async ({ orderId, totalAmount }) => {
  const response = await axios.post(
    PAYMENT_API,
    {
      orderId: orderId,
      amount: Math.round(totalAmount * 100), // convert Rs to cents
      currency: "usd",
    },
    {
      headers: {
        "X-User-Id": "user-123", // hardcoded for now — replace when auth is ready
      },
    },
  );
  return response.data.data; // { clientSecret, stripePaymentIntentId, ... }
};

// Step 2 — After Stripe confirms card, tell your backend to save SUCCESS
export const confirmPaymentInBackend = async (paymentIntentId) => {
  const response = await axios.post(
    `${PAYMENT_API}/confirm/${paymentIntentId}`,
    {},
  );
  return response.data.data;
};
