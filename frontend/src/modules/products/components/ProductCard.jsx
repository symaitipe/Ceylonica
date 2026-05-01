import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/services/cart.context";
import Notification from "../../../core/components/common/Notification";
import StarRating from "../../../core/components/common/StarRating";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const notifRef = useRef();

  const handleAddToCart = async (e) => {
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

    try {
      await addToCart({
        productId: product.productId,
        name: product.productName,
        imageUrl: product.cardImageUrls?.[0],
        price: product.productPrice,
        quantity: 1,
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

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#1A1209]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <Notification ref={notifRef} />

      <Link
        to={`/product/${product.productId}`}
        className="flex flex-col flex-1"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-[#FAF6EE]">
          {product.cardImageUrls?.[0] ? (
            <img
              src={product.cardImageUrls[0]}
              alt={product.productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#1A1209]/20 text-sm">
              No image
            </div>
          )}
          {product.stockQuantity < 1 && (
            <div className="absolute inset-0 bg-[#1A1209]/50 flex items-center justify-center">
              <span className="bg-white text-[#1A1209] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <h3
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="font-semibold text-[#1A1209] text-base leading-snug line-clamp-2"
          >
            {product.productName}
          </h3>
          <p className="text-[#C9A84C] font-bold text-lg">
            Rs. {product.productPrice?.toFixed(2)}
          </p>
          <StarRating
            rating={product.averageRating || 0}
            totalReviews={product.totalReviews || 0}
            size="small"
          />
          <p className="text-[#1A1209]/50 text-xs leading-relaxed line-clamp-2 mt-1">
            {product.productDescription}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          disabled={product.stockQuantity < 1}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wide transition-all duration-200
            ${
              product.stockQuantity < 1
                ? "bg-[#1A1209]/5 text-[#1A1209]/30 cursor-not-allowed"
                : "bg-[#1A1209] text-[#FAF6EE] hover:bg-[#C9A84C] hover:text-[#1A1209]"
            }`}
        >
          {product.stockQuantity < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
