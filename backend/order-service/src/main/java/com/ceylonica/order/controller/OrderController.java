package com.ceylonica.order.controller;

import com.ceylonica.order.model.DTOs.CreateOrderRequest;
import com.ceylonica.order.model.DTOs.UpdateOrderStatusRequest;
import com.ceylonica.order.model.Order;
import com.ceylonica.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Operation(summary = "Create a new order")
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order createdOrder = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @Operation(summary = "Get all orders of a specific user")
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @Operation(summary = "Get all orders (Admin)")
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @Operation(summary = "Get order by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @Operation(summary = "Update order status")
    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable String id,
                                              @RequestBody UpdateOrderStatusRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getStatus()));
    }

    @Operation(summary = "Cancel an order")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable String id) {
        orderService.cancelOrder(id);
        return ResponseEntity.noContent().build();
    }
}