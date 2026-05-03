import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../modules/auth/services/auth.context";
import { useCart } from "../modules/cart/services/cart.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="sticky top-0 z-50 bg-[#1A1209] border-b border-[#C9A84C]/20"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-bold text-xl tracking-widest text-[#C9A84C] uppercase"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ceylonica
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#C9A84C] text-[#1A1209] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/orders"
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                Orders
              </Link>
              <Link
                to="/profile"
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                Profile
              </Link>
              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium px-4 py-1.5 rounded-full hover:bg-[#C9A84C] hover:text-[#1A1209] transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#C9A84C] text-[#1A1209] text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-[#e0bc5a] transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#FAF6EE]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1209] border-t border-[#C9A84C]/20 px-6 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
          >
            Cart ({cartItems?.length || 0})
          </Link>
          {user ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
              >
                Orders
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
              >
                Profile
              </Link>
              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-left text-[#C9A84C] text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-[#FAF6EE]/70 hover:text-[#C9A84C] text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-[#C9A84C] text-sm font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
