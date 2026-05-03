import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/components/modules/home/HomePage";
import Login from "./core/components/modules/auth/pages/LoginPage";
import Register from "./core/components/modules/auth/pages/RegisterPage";
import ProductDetails from "./core/components/modules/products/pages/ProductDetailsPage";
import Cart from "./core/components/modules/cart/pages/CartPage";
import Checkout from "./core/components/modules/payment/pages/CheckoutPage";
import Orders from "./core/components/modules/orders/pages/OrdersPage";
import AdminDashboard from "./core/components/modules/admin/AdminDashboardPage";
import ProfilePage from "./core/components/modules/users/pages/ProfilePage";

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
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
