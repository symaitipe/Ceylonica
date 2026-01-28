package com.ceylonica.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReviewService {
    
    // In-memory storage for demo purposes
    private final Map<String, List<Map<String, Object>>> productReviews = new HashMap<>();
    
    public Map<String, Object> createReview(String productId, String userId, int rating, String comment) {
        Map<String, Object> review = new HashMap<>();
        review.put("id", UUID.randomUUID().toString());
        review.put("productId", productId);
        review.put("userId", userId);
        review.put("rating", rating);
        review.put("comment", comment);
        review.put("createdAt", LocalDateTime.now().toString());
        
        productReviews.computeIfAbsent(productId, k -> new ArrayList<>()).add(review);
        
        return review;
    }
    
    public List<Map<String, Object>> getProductReviews(String productId) {
        return productReviews.getOrDefault(productId, new ArrayList<>());
    }
    
    public Map<String, Object> getProductRatingSummary(String productId) {
        List<Map<String, Object>> reviews = getProductReviews(productId);
        
        if (reviews.isEmpty()) {
            return Map.of(
                "productId", productId,
                "averageRating", 0,
                "totalReviews", 0
            );
        }
        
        double avgRating = reviews.stream()
                .mapToInt(r -> (int) r.get("rating"))
                .average()
                .orElse(0);
        
        return Map.of(
            "productId", productId,
            "averageRating", Math.round(avgRating * 10) / 10.0,
            "totalReviews", reviews.size()
        );
    }
}
