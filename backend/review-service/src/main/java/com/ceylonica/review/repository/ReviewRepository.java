package com.ceylonica.review.repository;

import com.ceylonica.review.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductId(String productId);
    Optional<Review> findByReviewIdAndUserId(String reviewId, String userId);
    boolean existsByProductIdAndUserId(String productId, String userId);
}