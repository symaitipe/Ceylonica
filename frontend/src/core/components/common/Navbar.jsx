import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../modules/auth/services/auth.context";
import { useCart } from "../../../modules/cart/services/cart.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Ceylonica</Link>
      </div>

      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems?.length || 0})</Link>

        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
            {user.role === "ADMIN" && <Link to="/admin">Dashboard</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
