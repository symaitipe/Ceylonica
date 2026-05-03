import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./core/components/modules/auth/services/auth.context";
import { CartProvider } from "./core/components/modules/cart/services/cart.context";
import AppRoutes from "./routes";
import Navbar from "./core/components/common/Navbar";
import Footer from "./core/components/common/Footer";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
