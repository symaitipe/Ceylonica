package com.ceylonica.payment.controller;

import com.ceylonica.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestBody Map<String, Object> request) {
        String orderId = (String) request.get("orderId");
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String paymentMethod = (String) request.get("paymentMethod");
        
        return ResponseEntity.ok(paymentService.processPayment(orderId, amount, paymentMethod));
    }
    
    @PostMapping("/refund/{transactionId}")
    public ResponseEntity<Map<String, Object>> refundPayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.refundPayment(transactionId));
    }
    
    @GetMapping("/status/{transactionId}")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.getPaymentStatus(transactionId));
    }
}
