package com.ceylonica.review.controller;

import com.ceylonica.review.dto.ReviewRequest;
import com.ceylonica.review.dto.ReviewResponse;
import com.ceylonica.review.dto.ReviewSummary;
import com.ceylonica.review.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Add review
    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest request,
                                                    HttpServletRequest httpRequest) {
        String userId = httpRequest.getHeader("X-User-Id");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReview(userId, request));
    }

    // Get all reviews for a product
    @GetMapping("/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable String productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }

    // Get review summary (average rating + count)
    @GetMapping("/{productId}/summary")
    public ResponseEntity<ReviewSummary> getSummary(@PathVariable String productId) {
        return ResponseEntity.ok(reviewService.getReviewSummary(productId));
    }

    // Edit own review
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> editReview(@PathVariable String reviewId,
                                                     @RequestBody ReviewRequest request,
                                                     HttpServletRequest httpRequest) {
        String userId = httpRequest.getHeader("X-User-Id");
        return ResponseEntity.ok(reviewService.editReview(userId, reviewId, request));
    }

    // Delete own review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable String reviewId,
                                          HttpServletRequest httpRequest) {
        String userId = httpRequest.getHeader("X-User-Id");
        reviewService.deleteReview(userId, reviewId);
        return ResponseEntity.ok(Map.of("message", "Review deleted successfully"));
    }

    // Admin: delete any review
    @DeleteMapping("/admin/{reviewId}")
    public ResponseEntity<?> adminDeleteReview(@PathVariable String reviewId) {
        reviewService.adminDeleteReview(reviewId);
        return ResponseEntity.ok(Map.of("message", "Review deleted successfully"));
    }
}