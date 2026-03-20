import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/services/cart.context";
import Notification from "../../../core/components/common/Notification";
import StarRating from "../../../core/components/common/StarRating";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const notifRef = useRef();

  const handleAddToCart = (e) => {
    e.preventDefault();

    const existingItem = cartItems.find(
      (item) => item.productId === product.productId,
    );

    if (existingItem && existingItem.quantity >= product.stockQuantity) {
      notifRef.current.show(
        `Sorry, only ${product.stockQuantity} units available.`,
        "error",
      );
      return;
    }

    addToCart({
      productId: product.productId,
      name: product.productName,
      imageUrl: product.cardImageUrls?.[0],
      price: product.productPrice,
      quantity: 1,
    });

    notifRef.current.show("Added to cart!", "success");
  };

  return (
    <div className="product-card">
      <Notification ref={notifRef} />

      <Link to={`/product/${product.productId}`}>
        <div className="product-image">
          <img src={product.cardImageUrls?.[0]} alt={product.productName} />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-price">
            Rs. {product.productPrice?.toFixed(2)}
          </p>
          <StarRating
            rating={product.averageRating || 0}
            totalReviews={product.totalReviews || 0}
            size="small"
          />
          <p className="product-description">{product.productDescription}</p>
        </div>
      </Link>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stockQuantity < 1}
      >
        {product.stockQuantity < 1 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
