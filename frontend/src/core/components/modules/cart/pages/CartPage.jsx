import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../services/cart.context";
import { getProductById } from "../../products/services/product.service";
import styles from "./CartPage.module.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();
  const navigate = useNavigate();
  const [stockLimits, setStockLimits] = useState({});
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchStockLimits = async () => {
      const limits = {};
      await Promise.all(
        cartItems.map(async (item) => {
          try {
            const product = await getProductById(item.productId);
            limits[item.productId] = product.stockQuantity || 0;
          } catch (error) {
            console.error("Failed to fetch stock for:", item.productId);
            limits[item.productId] = item.quantity;
          }
        }),
      );
      setStockLimits(limits);
    };
    if (cartItems.length > 0) fetchStockLimits();
  }, [cartItems.length]);

  const handleIncrease = (item) => {
    const maxStock = stockLimits[item.productId];
    if (maxStock !== undefined && item.quantity >= maxStock) {
      setNotification(
        `Sorry, only ${maxStock} units of "${item.name}" are available.`,
      );
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    updateQuantity(item.productId, item.quantity + 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <h2 className={styles.emptyTitle}>Your Cart is Empty</h2>
        <p className={styles.emptyText}>
          Add some products to your cart to get started!
        </p>
        <Link to="/" className={styles.continueBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Shopping Cart</h2>

      {notification && <div className={styles.toast}>{notification}</div>}

      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.productId} className={styles.item}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.itemImage}
            />

            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>Rs. {item.price.toFixed(2)}</p>
            </div>

            <div className={styles.quantityControls}>
              <button
                className={styles.qtyBtn}
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
              >
                −
              </button>
              <span className={styles.qtyValue}>{item.quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>

            <p className={styles.itemTotal}>
              Rs. {(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>
            Rs. {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className={styles.actions}>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
