package com.ceylonica.order.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order{
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
}