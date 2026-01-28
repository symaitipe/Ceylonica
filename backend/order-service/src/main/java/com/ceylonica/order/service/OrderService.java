package com.ceylonica.order.service;

import com.ceylonica.order.model.Order;
import com.ceylonica.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public Order createOrder(Order order) {
        order.setStatus(Order.OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
    
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }
    
    public Order updateOrderStatus(String id, Order.OrderStatus status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    order.setUpdatedAt(LocalDateTime.now());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    
    public void cancelOrder(String id) {
        orderRepository.findById(id)
                .ifPresent(order -> {
                    order.setStatus(Order.OrderStatus.CANCELLED);
                    order.setUpdatedAt(LocalDateTime.now());
                    orderRepository.save(order);
                });
    }
}
