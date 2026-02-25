import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/services/cart.context';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

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
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product.id, 1)}
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductCard;
