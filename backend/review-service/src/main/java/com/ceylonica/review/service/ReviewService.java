package com.ceylonica.review.service;

import com.ceylonica.review.client.ProductClient;
import com.ceylonica.review.dto.ReviewRequest;
import com.ceylonica.review.dto.ReviewResponse;
import com.ceylonica.review.dto.ReviewSummary;
import com.ceylonica.review.model.Review;
import com.ceylonica.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductClient productClient;

    // ── Add Review ────────────────────────────────────────────────────
    public ReviewResponse addReview(String userId, ReviewRequest request) {
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        }

        if (reviewRepository.existsByProductIdAndUserId(request.getProductId(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You have already reviewed this product");
        }

        Review review = new Review();
        review.setProductId(request.getProductId());
        review.setUserId(userId);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        review = reviewRepository.save(review);
        updateProductRating(request.getProductId());

        return toResponse(review);
    }

    // ── Get Reviews for a Product ─────────────────────────────────────
    public List<ReviewResponse> getReviewsByProduct(String productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Get Review Summary ────────────────────────────────────────────
    public ReviewSummary getReviewSummary(String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        if (reviews.isEmpty()) {
            return new ReviewSummary(productId, 0.0, 0);
        }
        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
        double rounded = Math.round(average * 10.0) / 10.0;
        return new ReviewSummary(productId, rounded, reviews.size());
    }

    // ── Edit Own Review ───────────────────────────────────────────────
    public ReviewResponse editReview(String userId, String reviewId, ReviewRequest request) {
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        }

        Review review = reviewRepository.findByReviewIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Review not found or you are not the owner"));

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUpdatedAt(LocalDateTime.now());

        review = reviewRepository.save(review);
        updateProductRating(review.getProductId());

        return toResponse(review);
    }

    // ── Delete Own Review ─────────────────────────────────────────────
    public void deleteReview(String userId, String reviewId) {
        Review review = reviewRepository.findByReviewIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Review not found or you are not the owner"));

        String productId = review.getProductId();
        reviewRepository.deleteById(reviewId);
        updateProductRating(productId);
    }

    // ── Admin: Delete Any Review ──────────────────────────────────────
    public void adminDeleteReview(String reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        String productId = review.getProductId();
        reviewRepository.deleteById(reviewId);
        updateProductRating(productId);
    }

    // ── Update Product Rating via Feign ───────────────────────────────
    private void updateProductRating(String productId) {
        ReviewSummary summary = getReviewSummary(productId);
        productClient.updateProductRating(productId, summary.getAverageRating(), summary.getTotalReviews());
    }

    // ── Helper ────────────────────────────────────────────────────────
    private ReviewResponse toResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setReviewId(review.getReviewId());
        response.setProductId(review.getProductId());
        response.setUserId(review.getUserId());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());
        return response;
    }
}