package com.ceylonica.order.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    
    @Id
    private String id;
    private String userId;
    private String customerName;
    private List<OrderItem> items;
    private ShippingAddress shippingAddress;
    private String paymentMethod;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    public static class OrderItem {
        private String productId;
        private String productName;
        private int quantity;
        private BigDecimal price;
    }
    
    @Data
    public static class ShippingAddress {
        private String fullName;
        private String address;
        private String city;
        private String postalCode;
        private String phone;
    }
    
    public enum OrderStatus {
        PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    }
}
