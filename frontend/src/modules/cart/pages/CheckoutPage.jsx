import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "../services/cart.context";
import {
  createPaymentIntent,
  confirmPaymentInBackend,
} from "../../payment/services/payment.service";
import "./CheckoutPage.css";

// Put the stripe public key
const stripePromise = loadStripe("");

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
      // ── TEMPORARY: mock orderId until order-service is ready ──
      const orderId = "order-" + Date.now();

      if (formData.paymentMethod === "cod") {
        clearCart();
        navigate("/orders");
        return;
      }

      const paymentData = await createPaymentIntent({
        orderId,
        totalAmount: totalPrice,
      });

      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(paymentData.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: {
                city: formData.city,
                postal_code: formData.postalCode,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      await confirmPaymentInBackend(paymentIntent.id);
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>CHECKOUT</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-container">
        {/* ── Left: Checkout Form ── */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>📦 Shipping Information</h3>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Silva"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="123 Temple Road, Colombo 03"
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
                placeholder="Colombo"
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
                placeholder="00300"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>💳 Payment Method</h3>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              Credit / Debit Card
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
                      fontSize: "15px",
                      color: "#2C1A0E",
                      fontFamily: "Lato, sans-serif",
                      "::placeholder": { color: "#bbb" },
                    },
                    invalid: { color: "#c0392b" },
                  },
                }}
              />
              {/* <p className="card-test-hint">
                🧪 Test: 4242 4242 4242 4242 | 12/29 | 123
              </p> */}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (formData.paymentMethod === "card" && !stripe)}
          >
            {loading
              ? "⏳ Processing..."
              : formData.paymentMethod === "card"
                ? `Pay Rs. ${totalPrice.toFixed(2)}`
                : "✓ Place Order"}
          </button>
        </form>

        {/* ── Right: Order Summary ── */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total</strong>
            <strong>Rs. {totalPrice.toFixed(2)}</strong>
          </div>

          <div className="secure-badge">🔒 Secured by Stripe</div>
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
