package com.ceylonica.payment.service;

import com.ceylonica.payment.dto.PaymentRequest;
import com.ceylonica.payment.dto.PaymentResponse;
import com.ceylonica.payment.enums.PaymentStatus;
import com.ceylonica.payment.exception.PaymentNotFoundException;
import com.ceylonica.payment.model.Payment;
import com.ceylonica.payment.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    // ---------------------------------------------------------------
    // Create a Stripe PaymentIntent and save as PENDING
    // Returns clientSecret → frontend uses it to confirm with Stripe.js
    // ---------------------------------------------------------------
    public PaymentResponse createPayment(String userId, PaymentRequest request) throws StripeException {
        log.info("Creating payment for orderId={}, userId={}", request.getOrderId(), userId);

        // Prevent duplicate payment for same order
        paymentRepository.findByOrderId(request.getOrderId()).ifPresent(existing -> {
            if (existing.getStatus() == PaymentStatus.SUCCESS) {
                throw new IllegalStateException("Order " + request.getOrderId() + " is already paid.");
            }
        });

        // Create PaymentIntent with Stripe
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount())
                .setCurrency(request.getCurrency().toLowerCase())
                .putMetadata("orderId", request.getOrderId())
                .putMetadata("userId", userId)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        log.info("Stripe PaymentIntent created: {}", intent.getId());

        // Save to MongoDB
        Payment payment = Payment.builder()
                .orderId(request.getOrderId())
                .userId(userId)
                .amount(request.getAmount())
                .currency(request.getCurrency().toLowerCase())
                .status(PaymentStatus.PENDING)
                .stripePaymentIntentId(intent.getId())
                .stripeClientSecret(intent.getClientSecret())
                .build();

        payment = paymentRepository.save(payment);
        log.info("Payment saved to Mongo with id={}", payment.getId());
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Confirm payment after Stripe webhook / frontend callback
    // ---------------------------------------------------------------
    public PaymentResponse confirmPayment(String paymentIntentId) throws StripeException {
        log.info("Confirming payment for intentId={}", paymentIntentId);

        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "No payment found for intentId: " + paymentIntentId));

        // Verify status from Stripe directly (source of truth)
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

        if ("succeeded".equals(intent.getStatus())) {
            payment.setStatus(PaymentStatus.SUCCESS);
            log.info("Payment confirmed SUCCESS for orderId={}", payment.getOrderId());
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureMessage(intent.getLastPaymentError() != null
                    ? intent.getLastPaymentError().getMessage() : "Payment not completed");
            log.warn("Payment FAILED for orderId={}", payment.getOrderId());
        }

        payment = paymentRepository.save(payment);
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Get payment by ID
    // ---------------------------------------------------------------
    public PaymentResponse getPaymentById(String paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found: " + paymentId));
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Get payment by Order ID
    // ---------------------------------------------------------------
    public PaymentResponse getPaymentByOrderId(String orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "No payment found for orderId: " + orderId));
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Get all payments for a user
    // ---------------------------------------------------------------
    public List<PaymentResponse> getPaymentsByUser(String userId) {
        return paymentRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------------
    // Get all payments (Admin)
    // ---------------------------------------------------------------
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------------
    // Refund (Admin)
    // ---------------------------------------------------------------
    public PaymentResponse refundPayment(String paymentId) throws StripeException {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found: " + paymentId));

        if (payment.getStatus() != PaymentStatus.SUCCESS) {
            throw new IllegalStateException("Only successful payments can be refunded.");
        }

        log.info("Refunding payment: paymentId={}, intentId={}",
                paymentId, payment.getStripePaymentIntentId());

        RefundCreateParams refundParams = RefundCreateParams.builder()
                .setPaymentIntent(payment.getStripePaymentIntentId())
                .build();

        Refund.create(refundParams);

        payment.setStatus(PaymentStatus.REFUNDED);
        payment = paymentRepository.save(payment);

        log.info("Refund SUCCESS for paymentId={}", paymentId);
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Helper
    // ---------------------------------------------------------------
    private PaymentResponse toResponse(Payment payment) {
        return PaymentResponse.builder()
                .paymentId(payment.getId())
                .orderId(payment.getOrderId())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .status(payment.getStatus())
                .stripePaymentIntentId(payment.getStripePaymentIntentId())
                .clientSecret(payment.getStripeClientSecret())
                .failureMessage(payment.getFailureMessage())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}