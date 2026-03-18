import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./modules/products/pages/HomePage";
import Login from "./modules/auth/pages/LoginPage";
import Register from "./modules/auth/pages/RegisterPage";
import ProductDetails from "./modules/products/pages/ProductDetailsPage";
import Cart from "./modules/cart/pages/CartPage";
import Checkout from "./modules/payment/pages/CheckoutPage";
import Orders from "./modules/orders/pages/OrdersPage";
import AdminDashboard from "./modules/admin/pages/AdminDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
