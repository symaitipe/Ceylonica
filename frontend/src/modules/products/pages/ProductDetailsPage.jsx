import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product.service";
import {
  getReviews,
  addReview,
  editReview,
  deleteReview,
} from "../../reviews/service/review.service";
import { useCart } from "../../cart/services/cart.context";
import { useAuth } from "../../auth/services/auth.context";
import Loader from "../../../core/components/common/Loader";
import StarRating from "../../../core/components/common/StarRating";
import Notification from "../../../core/components/common/Notification";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const notifRef = useRef();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  //---------------------------------------------------- Fetch Products -------------------------------------------
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------------------- Fetch Reviews -------------------------------------------
  const fetchReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  //---------------------------------------------------- Handle Add To Cart -------------------------------------------
  const handleAddToCart = () => {
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
      quantity,
    });
    notifRef.current.show("Added to cart!", "success");
  };

  //---------------------------------------------------- Handle Submit Review -------------------------------------------
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      notifRef.current.show("Please select a star rating", "error");
      return;
    }
    try {
      setReviewLoading(true);
      if (editingReview) {
        await editReview(editingReview.reviewId, {
          productId: id,
          rating: newRating,
          comment: newComment,
        });
        notifRef.current.show("Review updated!", "success");
        setEditingReview(null);
      } else {
        await addReview({
          productId: id,
          rating: newRating,
          comment: newComment,
        });
        notifRef.current.show("Review submitted!", "success");
      }
      setNewRating(0);
      setNewComment("");
      fetchReviews();
      fetchProduct(); // refresh average rating
    } catch (err) {
      notifRef.current.show(
        err.response?.data?.message || "Failed to submit review",
        "error",
      );
    } finally {
      setReviewLoading(false);
    }
  };

  //----------------------------------------------------Handle Edit review -------------------------------------------
  const handleEditClick = (review) => {
    setEditingReview(review);
    setNewRating(review.rating);
    setNewComment(review.comment);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  //----------------------------------------------------Handle Delete review -------------------------------------------
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      notifRef.current.show("Review deleted", "success");
      fetchReviews();
      fetchProduct();
    } catch (err) {
      notifRef.current.show("Failed to delete review", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  const allImages = [
    ...(product.cardImageUrls || []),
    ...(product.detailImageUrls || []),
  ];

  return (
    <div className="product-details-page">
      <Notification ref={notifRef} />

      <div className="product-details-container">
        {/* Gallery */}
        <div className="product-gallery">
          {allImages.length > 0 && (
            <div className="product-gallery-thumbnails">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`gallery-thumbnail ${currentImageIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
          <div className="product-gallery-main">
            <div className="gallery-sale-badge">Sale</div>
            {allImages.length > 1 && (
              <button
                className="gallery-nav-btn left"
                onClick={() =>
                  setCurrentImageIndex((p) =>
                    p === 0 ? allImages.length - 1 : p - 1,
                  )
                }
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <img src={allImages[currentImageIndex]} alt={product.productName} />
            {allImages.length > 1 && (
              <button
                className="gallery-nav-btn right"
                onClick={() =>
                  setCurrentImageIndex((p) =>
                    p === allImages.length - 1 ? 0 : p + 1,
                  )
                }
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/*------------------------------------------ Product Info------------------------------ */}
        <div className="product-info-section">
          <h1>{product.productName}</h1>
          <p className="price">Rs. {product.productPrice?.toFixed(2)}</p>

          <StarRating
            rating={product.averageRating || 0}
            totalReviews={product.totalReviews || 0}
            size="medium"
          />

          <p className="description">{product.productDescription}</p>

          <div className="stock-status">
            {product.stockQuantity > 0 ? (
              <span className="in-stock">
                In Stock ({product.stockQuantity} available)
              </span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stockQuantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stockQuantity < 1}
          >
            {product.stockQuantity < 1 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/*---------------------------------------------- Reviews Section --------------------------------- */}
      <div className="reviews-section">
        <h2>Customer Reviews ({reviews.length})</h2>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.reviewId} className="review-item">
                <div className="review-header">
                  <StarRating rating={review.rating} size="small" />
                  <span className="review-user">{review.userId}</span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
                {user && user.sub === review.userId && (
                  <div className="review-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteReview(review.reviewId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Review Form */}
        {user && (
          <div className="review-form-section">
            <h3>{editingReview ? "Edit Your Review" : "Write a Review"}</h3>
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="rating-selector">
                <label>Your Rating:</label>
                <StarRating
                  rating={newRating}
                  size="large"
                  interactive={true}
                  onRate={setNewRating}
                />
              </div>
              <div className="form-group">
                <label>Your Comment:</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  required
                />
              </div>
              <div className="review-form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={reviewLoading}
                >
                  {reviewLoading
                    ? "Submitting..."
                    : editingReview
                      ? "Update Review"
                      : "Submit Review"}
                </button>
                {editingReview && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setEditingReview(null);
                      setNewRating(0);
                      setNewComment("");
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {!user && (
          <p className="login-to-review">
            Please <a href="/login">log in</a> to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
