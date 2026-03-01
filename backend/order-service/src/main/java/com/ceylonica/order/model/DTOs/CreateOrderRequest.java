package com.ceylonica.order.model.DTOs;

import com.ceylonica.order.model.OrderItem;
import com.ceylonica.order.model.ShippingAddress;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private String userId;
    private String customerName;
    private List<OrderItem> items;
    private ShippingAddress shippingAddress;
    private String paymentMethod;
}
