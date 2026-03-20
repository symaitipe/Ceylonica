package com.ceylonica.review.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface ProductClient {

    @PutMapping("/api/products/{productId}/rating")
    void updateProductRating(@PathVariable("productId") String productId,
                             @RequestParam("averageRating") double averageRating,
                             @RequestParam("totalReviews") int totalReviews);
}