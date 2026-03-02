package com.ceylonica.review.controller;

import com.ceylonica.review.model.Review;
import com.ceylonica.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // 1. SUBMIT REVIEW (With "One review per user" check)
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review, @RequestHeader(value = "X-User-Id", required = false) String headerUserId) {
        // If your leader sends userId in header, use it; otherwise use the body
        String userId = (headerUserId != null) ? headerUserId : review.getUserId();
        review.setUserId(userId);

        // Business Rule: One review per product per user
        Optional<Review> existing = reviewRepository.findByProductIdAndUserId(review.getProductId(), userId);
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Error: You have already reviewed this product.");
        }

        return ResponseEntity.ok(reviewRepository.save(review));
    }

    // 2. VIEW REVIEWS (With Sorting & Optional Filtering)
    @GetMapping("/product/{productId}")
    public List<Review> getReviews(@PathVariable String productId, @RequestParam(required = false) Integer rating) {
        if (rating != null) {
            return reviewRepository.findByProductIdAndRating(productId, rating);
        }
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    // 3. RATING ANALYTICS (Average + Total + Distribution)
    @GetMapping("/product/{productId}/summary")
    public Map<String, Object> getRatingSummary(@PathVariable String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);

        double average = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);

        // Rating Distribution (Counts of 1, 2, 3, 4, 5 stars)
        Map<Integer, Long> distribution = reviews.stream()
                .collect(Collectors.groupingBy(Review::getRating, Collectors.counting()));

        Map<String, Object> summary = new HashMap<>();
        summary.put("productId", productId);
        summary.put("averageRating", Math.round(average * 10.0) / 10.0); // Round to 1 decimal
        summary.put("totalReviews", reviews.size());
        summary.put("ratingDistribution", distribution);

        return summary;
    }

    // 4. EDIT/DELETE OWN REVIEWS
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review reviewDetails) {
        return reviewRepository.findById(id).map(review -> {
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            return ResponseEntity.ok(reviewRepository.save(review));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable String id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
