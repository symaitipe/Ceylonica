package com.ceylonica.payment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    public Map<String, Object> processPayment(String orderId, BigDecimal amount, String paymentMethod) {
        // Simulate payment processing
        String transactionId = UUID.randomUUID().toString();
        
        return Map.of(
            "transactionId", transactionId,
            "orderId", orderId,
            "amount", amount,
            "paymentMethod", paymentMethod,
            "status", "SUCCESS"
        );
    }
    
    public Map<String, Object> refundPayment(String transactionId) {
        return Map.of(
            "transactionId", transactionId,
            "status", "REFUNDED"
        );
    }
    
    public Map<String, Object> getPaymentStatus(String transactionId) {
        return Map.of(
            "transactionId", transactionId,
            "status", "COMPLETED"
        );
    }
}
