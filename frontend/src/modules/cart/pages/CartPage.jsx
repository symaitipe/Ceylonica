import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../services/cart.context";
import { getProductById } from "../../products/services/product.service";
import "./CartPage.css";

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

    if (cartItems.length > 0) {
      fetchStockLimits();
    }
  }, [cartItems.length]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleIncrease = (item) => {
    const maxStock = stockLimits[item.productId];
    if (maxStock !== undefined && item.quantity >= maxStock) {
      showNotification(
        `Sorry, only ${maxStock} units of ${item.name} are available.`,
      );
      return;
    }
    updateQuantity(item.productId, item.quantity + 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to get started!</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {notification && <div className="stock-toast">{notification}</div>}

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item)}>+</button>
            </div>
            <p className="item-total">
              Rs. {(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>Rs. {totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="checkout-btn"
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
