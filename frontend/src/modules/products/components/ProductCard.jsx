import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/services/cart.context";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      productId: product.productId,
      name: product.productName,
      imageUrl: product.cardImageUrls?.[0],
      price: product.productPrice,
      quantity: 1,
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.productId}`}>
        <div className="product-image">
          <img src={product.cardImageUrls?.[0]} alt={product.productName} />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-price">
            Rs. {product.productPrice?.toFixed(2)}
          </p>
          <p className="product-description">{product.productDescription}</p>
        </div>
      </Link>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
