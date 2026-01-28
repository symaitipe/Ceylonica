package com.ceylonica.notification.controller;

import com.ceylonica.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {
    
    private final NotificationService notificationService;
    
    @PostMapping("/email")
    public ResponseEntity<Map<String, Object>> sendEmail(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(notificationService.sendEmail(
            request.get("to"),
            request.get("subject"),
            request.get("body")
        ));
    }
    
    @PostMapping("/order-confirmation")
    public ResponseEntity<Map<String, Object>> sendOrderConfirmation(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(notificationService.sendOrderConfirmation(
            request.get("email"),
            request.get("orderId")
        ));
    }
    
    @PostMapping("/shipping")
    public ResponseEntity<Map<String, Object>> sendShippingNotification(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(notificationService.sendShippingNotification(
            request.get("email"),
            request.get("orderId"),
            request.get("trackingId")
        ));
    }
}
