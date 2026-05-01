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

  const fetchReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  const handleAddToCart = async () => {
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

    try {
      await addToCart({
        productId: product.productId,
        name: product.productName,
        imageUrl: product.cardImageUrls?.[0],
        price: product.productPrice,
        quantity,
      });
      notifRef.current.show("Added to cart!", "success");
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 503
          ? "Service is currently unavailable. Please try again later."
          : status === 401
            ? "Please log in to add items to cart."
            : status === 400
              ? "Invalid request. Please try again."
              : "Failed to add to cart.";

      notifRef.current.show(message, "error");
    }
  };

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
      fetchProduct();
    } catch (err) {
      notifRef.current.show(
        err.response?.data?.message || "Failed to submit review",
        "error",
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setNewRating(review.rating);
    setNewComment(review.comment);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6B4423]">
        Product not found
      </div>
    );

  const allImages = [
    ...(product.cardImageUrls || []),
    ...(product.detailImageUrls || []),
  ];

  return (
    <div className="font-body bg-[#FAF6EE] min-h-screen">
      <Notification ref={notifRef} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Product Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-3 w-20">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${currentImageIndex === idx ? "border-[#C9A84C] shadow-md" : "border-transparent opacity-60 hover:opacity-90"}`}
                  >
                    <img
                      src={img}
                      alt={`thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1 bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
              <span className="absolute top-4 left-4 z-10 bg-[#C9A84C] text-[#1A1209] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Sale
              </span>
              {allImages.length > 0 && (
                <img
                  src={allImages[currentImageIndex]}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              )}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((p) =>
                        p === 0 ? allImages.length - 1 : p - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A1209"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((p) =>
                        p === allImages.length - 1 ? 0 : p + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A1209"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 py-2">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                Ceylonica
              </span>
              <h1 className="font-display text-4xl font-bold text-[#1A1209] mt-2 leading-tight">
                {product.productName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-display text-3xl font-bold text-[#C9A84C]">
                Rs. {product.productPrice?.toFixed(2)}
              </span>
              <StarRating
                rating={product.averageRating || 0}
                totalReviews={product.totalReviews || 0}
                size="medium"
              />
            </div>

            <p className="text-[#1A1209]/70 leading-relaxed border-t border-[#1A1209]/10 pt-6">
              {product.productDescription}
            </p>

            {/* Stock */}
            <div>
              {product.stockQuantity > 0 ? (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5016] bg-[#2D5016]/10 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#2D5016]" />
                  In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 bg-red-50 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 border-t border-[#1A1209]/10 pt-6">
              <div className="flex items-center border border-[#1A1209]/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-[#1A1209] hover:bg-[#1A1209]/5 transition-colors font-medium text-lg"
                >
                  −
                </button>
                <span className="px-5 py-3 font-semibold text-[#1A1209] border-x border-[#1A1209]/20 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stockQuantity, q + 1))
                  }
                  className="px-4 py-3 text-[#1A1209] hover:bg-[#1A1209]/5 transition-colors font-medium text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity < 1}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all duration-200
                  ${
                    product.stockQuantity < 1
                      ? "bg-[#1A1209]/10 text-[#1A1209]/40 cursor-not-allowed"
                      : "bg-[#1A1209] text-[#FAF6EE] hover:bg-[#C9A84C] hover:text-[#1A1209]"
                  }`}
              >
                {product.stockQuantity < 1 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 border-t border-[#1A1209]/10 pt-14">
          <div className="flex flex-col items-center gap-2 mb-12">
            <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em]">
              Feedback
            </span>
            <h2 className="font-display text-3xl font-bold text-[#1A1209]">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mt-1" />
          </div>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p className="text-center text-[#1A1209]/40 py-12 italic">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="grid gap-5 max-w-3xl mx-auto mb-12">
              {reviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#1A1209]/5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-bold text-sm uppercase">
                        {review.userId?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1209] text-sm">
                          {review.userId}
                        </p>
                        <p className="text-[#1A1209]/40 text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="small" />
                  </div>
                  <p className="text-[#1A1209]/70 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                  {user && user.sub === review.userId && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-[#1A1209]/5">
                      <button
                        onClick={() => handleEditClick(review)}
                        className="text-xs font-semibold text-[#C9A84C] hover:text-[#1A1209] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.reviewId)}
                        className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Review Form */}
          {user ? (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-[#1A1209]/5">
              <h3 className="font-display text-2xl font-bold text-[#1A1209] mb-6">
                {editingReview ? "Edit Your Review" : "Write a Review"}
              </h3>
              <form
                onSubmit={handleSubmitReview}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#1A1209]/70 mb-2 uppercase tracking-wide">
                    Your Rating
                  </label>
                  <StarRating
                    rating={newRating}
                    size="large"
                    interactive={true}
                    onRate={setNewRating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1209]/70 mb-2 uppercase tracking-wide">
                    Your Comment
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    required
                    className="w-full border border-[#1A1209]/15 rounded-xl px-4 py-3 text-[#1A1209] placeholder-[#1A1209]/30 resize-none focus:outline-none focus:border-[#C9A84C] transition-colors bg-[#FAF6EE]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="bg-[#1A1209] text-[#FAF6EE] px-8 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#C9A84C] hover:text-[#1A1209] transition-all duration-200 disabled:opacity-50"
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
                      onClick={() => {
                        setEditingReview(null);
                        setNewRating(0);
                        setNewComment("");
                      }}
                      className="px-8 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide border border-[#1A1209]/20 text-[#1A1209]/60 hover:border-[#1A1209]/50 hover:text-[#1A1209] transition-all duration-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <p className="text-center text-[#1A1209]/50 text-sm">
              Please{" "}
              <a
                href="/login"
                className="text-[#C9A84C] font-semibold hover:underline"
              >
                log in
              </a>{" "}
              to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
