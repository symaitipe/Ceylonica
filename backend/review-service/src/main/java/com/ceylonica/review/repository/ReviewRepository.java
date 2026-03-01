package com.ceylonica.review.repository;

import com.ceylonica.review.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {

    // This custom method finds all reviews for a specific product
    List<Review> findByProductId(String productId);
}
