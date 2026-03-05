package com.ceylonica.payment.controller;

import com.ceylonica.payment.constants.AppConstants;
import com.ceylonica.payment.dto.ApiResponse;
import com.ceylonica.payment.dto.PaymentRequest;
import com.ceylonica.payment.dto.PaymentResponse;
import com.ceylonica.payment.service.PaymentService;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Create PaymentIntent — returns clientSecret to frontend
    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @RequestHeader(AppConstants.HEADER_USER_ID) String userId,
            @Valid @RequestBody PaymentRequest request) throws StripeException {

        PaymentResponse response = paymentService.createPayment(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    // Confirm payment after frontend completes Stripe.js flow
    @PostMapping("/confirm/{paymentIntentId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> confirmPayment(
            @PathVariable String paymentIntentId) throws StripeException {

        PaymentResponse response = paymentService.confirmPayment(paymentIntentId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    // Get payment by ID
    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(
            @PathVariable String paymentId) {

        return ResponseEntity.ok(ApiResponse.success(paymentService.getPaymentById(paymentId)));
    }

    // Get payment by Order ID
    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByOrderId(
            @PathVariable String orderId) {

        return ResponseEntity.ok(ApiResponse.success(paymentService.getPaymentByOrderId(orderId)));
    }

    // Get current user's payment history
    @GetMapping("/my-payments")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getMyPayments(
            @RequestHeader(AppConstants.HEADER_USER_ID) String userId) {

        return ResponseEntity.ok(ApiResponse.success(paymentService.getPaymentsByUser(userId)));
    }

    // Admin: Get all payments
    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getAllPayments(
            @RequestHeader(AppConstants.HEADER_USER_ROLE) String userRole) {

        if (!AppConstants.ROLE_ADMIN.equals(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Admin access required."));
        }
        return ResponseEntity.ok(ApiResponse.success(paymentService.getAllPayments()));
    }

    // Admin: Refund a payment
    @PostMapping("/{paymentId}/refund")
    public ResponseEntity<ApiResponse<PaymentResponse>> refundPayment(
            @PathVariable String paymentId,
            @RequestHeader(AppConstants.HEADER_USER_ROLE) String userRole) throws StripeException {

        if (!AppConstants.ROLE_ADMIN.equals(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Admin access required."));
        }
        return ResponseEntity.ok(ApiResponse.success(paymentService.refundPayment(paymentId)));
    }
}
