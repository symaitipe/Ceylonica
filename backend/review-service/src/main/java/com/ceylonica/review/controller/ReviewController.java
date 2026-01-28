package com.ceylonica.review.controller;

import com.ceylonica.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {
    
    private final ReviewService reviewService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReview(
            @RequestBody Map<String, Object> request,
            @RequestHeader("X-User-Id") String userId) {
        String productId = (String) request.get("productId");
        int rating = (int) request.get("rating");
        String comment = (String) request.get("comment");
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(productId, userId, rating, comment));
    }
    
    @GetMapping("/product/{productId}")
    public List<Map<String, Object>> getProductReviews(@PathVariable String productId) {
        return reviewService.getProductReviews(productId);
    }
    
    @GetMapping("/product/{productId}/summary")
    public ResponseEntity<Map<String, Object>> getProductRatingSummary(@PathVariable String productId) {
        return ResponseEntity.ok(reviewService.getProductRatingSummary(productId));
    }
}
