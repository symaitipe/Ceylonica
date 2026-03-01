import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product.service';
import { useCart } from '../../cart/services/cart.context';
import Loader from '../../../core/components/common/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  const allImages = product ? [
    ...(product.cardImageUrls || []),
    ...(product.detailImageUrls || [])
  ] : [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? Math.max(0, allImages.length - 1) : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">

        <div className="product-gallery">
          {/* Thumbnails */}
          {allImages.length > 0 && (
            <div className="product-gallery-thumbnails">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`gallery-thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="product-gallery-main">
            <div className="gallery-sale-badge">Sale</div>

            {allImages.length > 1 && (
              <button className="gallery-nav-btn left" onClick={handlePrevImage}>
                <svg viewBox="0 0 24 24" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}

            <img src={allImages[currentImageIndex] || product.imageUrl} alt={product.name} />

            {allImages.length > 1 && (
              <button className="gallery-nav-btn right" onClick={handleNextImage}>
                <svg viewBox="0 0 24 24" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            )}

            <button className="gallery-expand-btn">
              <svg viewBox="0 0 24 24" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
          </div>
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="price">Rs. {product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <div className="stock-status">
            {product.inStock ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
