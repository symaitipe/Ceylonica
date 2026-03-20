package com.ceylonica.review.dto;

public class ReviewSummary {
    private String productId;
    private double averageRating;
    private int totalReviews;

    public ReviewSummary(String productId, double averageRating, int totalReviews) {
        this.productId = productId;
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    public String getProductId() { return productId; }
    public double getAverageRating() { return averageRating; }
    public int getTotalReviews() { return totalReviews; }
}
