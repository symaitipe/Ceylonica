package com.ceylonica.review.controller;

import com.ceylonica.review.model.Review;
import com.ceylonica.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController // Tells Spring this is an API
@RequestMapping("/reviews") // All URLs start with /reviews
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // 1. Submit a New Review (POST /reviews)
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    // 2. Get All Reviews for a Product (GET /reviews/product/{productId})
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable String productId) {
        return reviewRepository.findByProductId(productId);
    }

    // 3. Get Rating Summary (GET /reviews/product/{productId}/summary)
    @GetMapping("/product/{productId}/summary")
    public Map<String, Object> getRatingSummary(@PathVariable String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);

        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        Map<String, Object> summary = new HashMap<>();
        summary.put("productId", productId);
        summary.put("averageRating", average);
        summary.put("totalReviews", reviews.size());

        return summary;
    }
}
