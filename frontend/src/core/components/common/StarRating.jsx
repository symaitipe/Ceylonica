import React from "react";
import "./StarRating.css";

const StarRating = ({
  rating,
  totalReviews,
  size = "small",
  interactive = false,
  onRate,
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`star-rating ${size}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? "filled" : "empty"} ${interactive ? "interactive" : ""}`}
          onClick={() => interactive && onRate && onRate(star)}
        >
          ★
        </span>
      ))}
      {totalReviews !== undefined && (
        <span className="review-count">
          {rating > 0 ? `${rating.toFixed(1)}` : "No ratings"}{" "}
          {totalReviews > 0 ? `(${totalReviews})` : ""}
        </span>
      )}
    </div>
  );
};

export default StarRating;
