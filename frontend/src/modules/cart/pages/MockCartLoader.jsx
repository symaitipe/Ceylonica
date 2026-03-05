import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockCartItems = [
  {
    id: "prod-001",
    name: "Organic Coconut Oil 500ml",
    price: 1500,
    quantity: 2,
    imageUrl: "https://placehold.co/80x80?text=Coconut+Oil",
  },
  {
    id: "prod-002",
    name: "Ceylon Black Tea 100g",
    price: 850,
    quantity: 1,
    imageUrl: "https://placehold.co/80x80?text=Ceylon+Tea",
  },
  {
    id: "prod-003",
    name: "Raw Wildflower Honey 250g",
    price: 2200,
    quantity: 1,
    imageUrl: "https://placehold.co/80x80?text=Honey",
  },
];

const MockCartLoader = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Write to localStorage
    localStorage.setItem("cart", JSON.stringify(mockCartItems));

    // Verify it was written correctly
    const saved = localStorage.getItem("cart");
    const parsed = JSON.parse(saved);
    console.log("✅ Mock cart saved to localStorage:", parsed);

    setReady(true);
  }, []);

  const handleGoToCart = () => {
    // Double-check it's still there before navigating
    const saved = localStorage.getItem("cart");
    console.log("📦 Cart in localStorage before navigate:", saved);
    navigate("/cart");
  };

  const total = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "80px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 8,
        fontFamily: "sans-serif",
      }}
    >
      <h2>🛒 Mock Cart Loader</h2>
      <p style={{ color: "#666" }}>
        Seeds test products into localStorage so you can test Cart → Checkout →
        Payment without other services.
      </p>

      {/* Show what will be loaded */}
      <div style={{ margin: "16px 0" }}>
        {mockCartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            fontWeight: "bold",
          }}
        >
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      {ready && (
        <>
          <div
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: 10,
              borderRadius: 6,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            ✅ Mock cart ready in localStorage
          </div>
          <button
            onClick={handleGoToCart}
            style={{
              width: "100%",
              padding: 12,
              background: "#556B2F",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Go to Cart →
          </button>
        </>
      )}
    </div>
  );
};

export default MockCartLoader;
