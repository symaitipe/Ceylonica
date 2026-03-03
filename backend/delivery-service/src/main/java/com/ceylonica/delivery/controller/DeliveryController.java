package com.ceylonica.delivery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    @PostMapping("/request")
    public ResponseEntity<?> requestDelivery(@RequestBody Map<String, Object> request) {
        String orderId = (String) request.get("orderId");
        String method = (String) request.get("deliveryMethod"); // PickMe, Koombiyo

        return ResponseEntity.ok(Map.of(
                "deliveryId", UUID.randomUUID().toString(),
                "status", "DISPATCHED",
                "partner", method != null ? method : "Standard",
                "message", "Delivery request sent to " + (method != null ? method : "courier") + " for order: " + orderId
        ));
    }
}
