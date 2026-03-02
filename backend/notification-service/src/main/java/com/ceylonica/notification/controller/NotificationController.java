package com.ceylonica.notification.controller;

import com.ceylonica.notification.dto.EmailRequest;
import com.ceylonica.notification.dto.OrderRequest;
import com.ceylonica.notification.dto.ShippingRequest;
import com.ceylonica.notification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    /**
     * POST /notifications/email
     * Send a fully custom email (to, subject, body).
     */
    @PostMapping("/email")
    public ResponseEntity<?> sendCustomEmail(@RequestBody EmailRequest request) {
        try {
            emailService.sendSimpleEmail(request.getTo(), request.getSubject(), request.getBody());
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "FAILED", "message", e.getMessage()));
        }
    }

    /**
     * POST /notifications/order-confirmation
     * Send an order confirmation email.
     */
    @PostMapping("/order-confirmation")
    public ResponseEntity<?> sendOrderConfirmation(@RequestBody OrderRequest request) {
        try {
            String subject = "Order Confirmation - " + request.getOrderId();
            String body = "Thank you for your order!\n\n"
                    + "Your order #" + request.getOrderId() + " has been confirmed.\n"
                    + "We will notify you when your order is shipped.\n\n"
                    + "— Ceylonica Team";
            emailService.sendSimpleEmail(request.getEmail(), subject, body);
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "FAILED", "message", e.getMessage()));
        }
    }

    /**
     * POST /notifications/shipping
     * Send a shipping notification email with tracking info.
     */
    @PostMapping("/shipping")
    public ResponseEntity<?> sendShippingNotification(@RequestBody ShippingRequest request) {
        try {
            String subject = "Your Order Has Been Shipped - " + request.getOrderId();
            String body = "Great news! Your order #" + request.getOrderId() + " has been shipped.\n\n"
                    + "Tracking ID: " + request.getTrackingId() + "\n"
                    + "You can track your package using the tracking ID.\n\n"
                    + "— Ceylonica Team";
            emailService.sendSimpleEmail(request.getEmail(), subject, body);
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "FAILED", "message", e.getMessage()));
        }
    }
}