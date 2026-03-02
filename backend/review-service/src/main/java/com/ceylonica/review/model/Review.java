package com.ceylonica.review.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data // This automatically adds Getters and Setters thanks to Lombok
@Document(collection = "reviews")

public class Review {
    @Id
    private String id;
    private String productId;
    private String userId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
}
