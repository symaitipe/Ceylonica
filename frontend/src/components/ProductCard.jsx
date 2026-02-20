import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-image">
          <img src={product.imageUrl} alt={product.description || 'Product'} />
        </div>

        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="product-price">Rs. {product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
