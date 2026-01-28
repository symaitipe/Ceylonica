package com.ceylonica.delivery.controller;

import com.ceylonica.delivery.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/delivery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeliveryController {
    
    private final DeliveryService deliveryService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createDelivery(@RequestBody Map<String, Object> request) {
        String orderId = (String) request.get("orderId");
        @SuppressWarnings("unchecked")
        Map<String, Object> address = (Map<String, Object>) request.get("address");
        String provider = (String) request.getOrDefault("provider", "koombiyo");
        
        return ResponseEntity.ok(deliveryService.createDelivery(orderId, address, provider));
    }
    
    @GetMapping("/track/{trackingId}")
    public ResponseEntity<Map<String, Object>> trackDelivery(@PathVariable String trackingId) {
        return ResponseEntity.ok(deliveryService.getDeliveryStatus(trackingId));
    }
    
    @PatchMapping("/{trackingId}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable String trackingId,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(deliveryService.updateDeliveryStatus(trackingId, body.get("status")));
    }
}
