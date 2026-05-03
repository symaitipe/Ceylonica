import React, { createContext, useContext, useState, useEffect } from "react";
import * as cartApi from "./cart.service";
import { useAuth } from "../../auth/services/auth.context";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartApi.getCart();

      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    try {
      if (isAuthenticated) {
        await cartApi.addToCart(item);
        await fetchCart();
      } else {
        const existingItem = cartItems.find(
          (i) => i.productId === item.productId,
        );
        if (existingItem) {
          setCartItems(
            cartItems.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          );
        } else {
          setCartItems([...cartItems, item]);
        }
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  };
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      console.log("called update q and check q<1");
      removeFromCart(itemId);
      return;
    }

    try {
      if (isAuthenticated) {
        await cartApi.updateCartItem(itemId, quantity);
        await fetchCart();
      } else {
        setCartItems(
          cartItems.map((item) =>
            cartItems.map((item) =>
              item.productId === itemId ? { ...item, quantity } : item,
            ),
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (isAuthenticated) {
        await cartApi.removeFromCart(itemId);
        await fetchCart();
      } else {
        setCartItems(cartItems.filter((item) => item.productId !== itemId));
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartApi.clearCart();
      }
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    itemCount: cartItems.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
