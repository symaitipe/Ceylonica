package com.ceylonica.product.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    
    @Id
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String category;
    private String imageUrl;
    private List<String> images;
    private boolean inStock;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
