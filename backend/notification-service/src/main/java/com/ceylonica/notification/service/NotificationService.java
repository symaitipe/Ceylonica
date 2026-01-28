package com.ceylonica.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    
    private final JavaMailSender mailSender;
    
    public Map<String, Object> sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            
            mailSender.send(message);
            
            log.info("Email sent successfully to: {}", to);
            return Map.of(
                "status", "SUCCESS",
                "message", "Email sent successfully"
            );
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            return Map.of(
                "status", "FAILED",
                "message", "Failed to send email: " + e.getMessage()
            );
        }
    }
    
    public Map<String, Object> sendOrderConfirmation(String email, String orderId) {
        String subject = "Order Confirmation - " + orderId;
        String body = "Thank you for your order!\n\nYour order #" + orderId + " has been confirmed.\n\nWe will notify you when your order is shipped.";
        return sendEmail(email, subject, body);
    }
    
    public Map<String, Object> sendShippingNotification(String email, String orderId, String trackingId) {
        String subject = "Your Order Has Been Shipped - " + orderId;
        String body = "Great news! Your order #" + orderId + " has been shipped.\n\nTracking ID: " + trackingId + "\n\nYou can track your package using the tracking ID.";
        return sendEmail(email, subject, body);
    }
}
