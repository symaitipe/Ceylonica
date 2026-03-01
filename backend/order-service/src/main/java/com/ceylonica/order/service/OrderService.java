package com.ceylonica.order.service;

import com.ceylonica.order.model.DTOs.CreateOrderRequest;
import com.ceylonica.order.model.Order;
import com.ceylonica.order.model.OrderStatus;

import java.util.List;

public interface OrderService {
    Order createOrder(CreateOrderRequest request);
    List<Order> getOrdersByUser(String userId);
    List<Order> getAllOrders();
    Order getOrderById(String id);
    Order updateOrderStatus(String id, OrderStatus status);
    void cancelOrder(String id);
}