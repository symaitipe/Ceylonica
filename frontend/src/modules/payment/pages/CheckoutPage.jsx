import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "../../cart/services/cart.context";
import { createOrder } from "../../orders/services/order.service";
import {
  createPayment,
  confirmPayment,
  linkPaymentToOrder,
} from "../../payment/services/Payment.service";
import "./CheckoutPage.css";

const stripePromise = loadStripe(
  "pk_test_51RNbJuFwH7tFNtyLAZnM3Xsx6o55cJYpCc4zWfuE8BWIfTWyusxrapdsYIJKUZm920l6G4k0WnZgn5jinVPjXKMm00XCK6cyFZ",
);

const CheckoutForm = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderData = {
        customerName: formData.fullName,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: totalPrice,
      };

      // ── COD flow ──────────────────────────────────────────────────
      if (formData.paymentMethod === "cod") {
        await createOrder(orderData);
        clearCart();
        navigate("/orders");
        return;
      }

      // ── Card flow ─────────────────────────────────────────────────

      // Step 1 — Create PaymentIntent (no orderId yet)
      const amountInCents = Math.round(totalPrice * 100);
      const paymentData = await createPayment(amountInCents);
      const clientSecret = paymentData.data.clientSecret;
      const paymentIntentId = paymentData.data.stripePaymentIntentId;

      // Step 2 — Confirm card payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      // Step 3 — Payment succeeded → create order
      if (paymentIntent.status === "succeeded") {
        const order = await createOrder(orderData);

        // Step 4 — Link payment to order
        await linkPaymentToOrder(paymentIntentId, order.id);

        // Step 5 — Confirm on backend
        await confirmPayment(paymentIntentId);

        clearCart();
        navigate("/orders");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Information</h3>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>Payment Method</h3>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </div>

          {formData.paymentMethod === "card" && (
            <div className="card-element-container">
              <label>Card Details</label>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          )}

          <button type="submit" disabled={loading || !stripe}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.productId} className="summary-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>Rs. {totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
