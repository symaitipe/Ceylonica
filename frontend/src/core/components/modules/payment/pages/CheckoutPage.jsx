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
import styles from "./CheckoutPage.module.css";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log("Stripe key loaded:", stripeKey); // Debug log

const stripePromise = loadStripe(stripeKey);

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

      if (formData.paymentMethod === "cod") {
        await createOrder(orderData);
        clearCart();
        navigate("/orders");
        return;
      }

      const amountInCents = Math.round(totalPrice * 100);
      const paymentData = await createPayment(amountInCents);
      const clientSecret = paymentData.data.clientSecret;
      const paymentIntentId = paymentData.data.stripePaymentIntentId;

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

      if (paymentIntent.status === "succeeded") {
        const order = await createOrder(orderData);
        await linkPaymentToOrder(paymentIntentId, order.id);
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

  const shippingFields = [
    {
      label: "Full Name",
      id: "fullName",
      type: "text",
      placeholder: "John Doe",
    },
    {
      label: "Email",
      id: "email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      label: "Phone",
      id: "phone",
      type: "tel",
      placeholder: "+94 xx xxx xxxx",
    },
  ];

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Checkout</h2>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.container}>
        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.sectionTitle}>Shipping Information</h3>

          {shippingFields.map(({ label, id, type, placeholder }) => (
            <div key={id} className={styles.fieldGroup}>
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className={styles.input}
              />
            </div>
          ))}

          <div className={styles.fieldGroup}>
            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              rows={3}
              required
              className={styles.textarea}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="city" className={styles.label}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Colombo"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="postalCode" className={styles.label}>
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="10001"
                required
                className={styles.input}
              />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Payment Method</h3>

          <div className={styles.paymentOptions}>
            {[
              { value: "card", label: "💳  Credit / Debit Card" },
              { value: "cod", label: "🚚  Cash on Delivery" },
            ].map(({ value, label }) => (
              <label key={value} className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={formData.paymentMethod === value}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.paymentOptionText}>{label}</span>
              </label>
            ))}
          </div>

          {formData.paymentMethod === "card" && (
            <div className={styles.cardElementWrapper}>
              <label className={styles.label}>Card Details</label>
              <div className={styles.cardElement}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "15px",
                        color: "#1A1209",
                        fontFamily: "'DM Sans', sans-serif",
                        "::placeholder": { color: "#1A120940" },
                      },
                      invalid: { color: "#dc2626" },
                    },
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !stripe}
            className={styles.submitBtn}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* ── Order Summary ── */}
        <div className={styles.summary}>
          <div className={styles.summaryInner}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.productId} className={styles.summaryItem}>
                <span className={styles.summaryItemName}>
                  {item.name}{" "}
                  <span className="text-[#1A1209]/40">x{item.quantity}</span>
                </span>
                <span className={styles.summaryItemPrice}>
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className={styles.summaryDivider}>
              <div className={styles.summaryTotal}>
                <span className={styles.summaryTotalLabel}>Total</span>
                <span className={styles.summaryTotalValue}>
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
