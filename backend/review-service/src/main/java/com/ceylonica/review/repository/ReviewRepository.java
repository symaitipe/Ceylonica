package com.ceylonica.review.repository;

import com.ceylonica.review.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review, String> {

    // 1. Basic find (Required by your Controller)
    List<Review> findByProductId(String productId);

    // 2. Feature: Sort reviews by date (Newest First)
    List<Review> findByProductIdOrderByCreatedAtDesc(String productId);

    // 3. Feature: Filter reviews by rating (e.g., only 5-star reviews)
    List<Review> findByProductIdAndRating(String productId, int rating);

    // 4. Feature: One review per product per user check
    Optional<Review> findByProductIdAndUserId(String productId, String userId);

    // 5. Feature: Track reviews by user
    List<Review> findByUserId(String userId);
}