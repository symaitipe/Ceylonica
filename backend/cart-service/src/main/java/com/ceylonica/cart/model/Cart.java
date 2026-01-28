package com.ceylonica.cart.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "carts")
public class Cart {
    
    @Id
    private String id;
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    public static class CartItem {
        private String id;
        private String productId;
        private String name;
        private String imageUrl;
        private BigDecimal price;
        private int quantity;
    }
}
