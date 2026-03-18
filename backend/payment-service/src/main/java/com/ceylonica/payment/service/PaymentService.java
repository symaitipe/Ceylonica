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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // ---------------------------------------------------------------
    // Create PaymentIntent (orderId is now optional)
    // ---------------------------------------------------------------
    public PaymentResponse createPayment(String userId, PaymentRequest request) throws StripeException {

        // Only check for existing payment if orderId is provided
        if (request.getOrderId() != null) {
            Optional<Payment> existingPayment = paymentRepository.findByOrderId(request.getOrderId());

            if (existingPayment.isPresent()) {
                Payment existing = existingPayment.get();

                switch (existing.getStatus()) {
                    case SUCCESS:
                        throw new IllegalStateException("Order " + request.getOrderId() + " is already paid.");
                    case REFUNDED:
                        throw new IllegalStateException("Order " + request.getOrderId() + " has been refunded.");
                    case PENDING:
                        throw new IllegalStateException(
                                "A payment for order " + request.getOrderId() +
                                        " is already in progress. Please complete or wait before retrying.");
                    case FAILED:
                        return retryFailedPayment(existing, request, userId);
                    default:
                        throw new IllegalStateException("Unexpected payment status.");
                }
            }
        }

        return createNewPayment(userId, request);
    }

    // ---------------------------------------------------------------
    // Link payment to order after order is created
    // ---------------------------------------------------------------
    public PaymentResponse linkOrderToPayment(String paymentIntentId, String orderId) {
        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "No payment found for intentId: " + paymentIntentId));

        payment.setOrderId(orderId);
        payment = paymentRepository.save(payment);
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Create a brand new payment (first attempt)
    // ---------------------------------------------------------------
    private PaymentResponse createNewPayment(String userId, PaymentRequest request) throws StripeException {
        PaymentIntent intent = createStripeIntent(request, userId);

        Payment payment = Payment.builder()
                .orderId(request.getOrderId()) // may be null — that's OK
                .userId(userId)
                .amount(request.getAmount())
                .currency(request.getCurrency().toLowerCase())
                .status(PaymentStatus.PENDING)
                .stripePaymentIntentId(intent.getId())
                .stripeClientSecret(intent.getClientSecret())
                .build();

        payment = paymentRepository.save(payment);
        return toResponse(payment);
    }

    // ---------------------------------------------------------------
    // Retry a failed payment
    // ---------------------------------------------------------------
    private PaymentResponse retryFailedPayment(Payment existing, PaymentRequest request, String userId)
            throws StripeException {

        PaymentIntent intent = createStripeIntent(request, userId);

        existing.setStatus(PaymentStatus.PENDING);
        existing.setStripePaymentIntentId(intent.getId());
        existing.setStripeClientSecret(intent.getClientSecret());
        existing.setFailureMessage(null);

        existing = paymentRepository.save(existing);
        return toResponse(existing);
    }

    // ---------------------------------------------------------------
    // Shared Stripe PaymentIntent creation
    // ---------------------------------------------------------------
    private PaymentIntent createStripeIntent(PaymentRequest request, String userId) throws StripeException {
        PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount())
                .setCurrency(request.getCurrency().toLowerCase())
                .putMetadata("userId", userId)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                );

        if (request.getOrderId() != null) {
            paramsBuilder.putMetadata("orderId", request.getOrderId());
        }

        return PaymentIntent.create(paramsBuilder.build());
    }

    // ---------------------------------------------------------------
    // Confirm payment after Stripe frontend callback
    // ---------------------------------------------------------------
    public PaymentResponse confirmPayment(String paymentIntentId) throws StripeException {
        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "No payment found for intentId: " + paymentIntentId));

        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

        if ("succeeded".equals(intent.getStatus())) {
            payment.setStatus(PaymentStatus.SUCCESS);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureMessage(intent.getLastPaymentError() != null
                    ? intent.getLastPaymentError().getMessage() : "Payment not completed");
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

        RefundCreateParams refundParams = RefundCreateParams.builder()
                .setPaymentIntent(payment.getStripePaymentIntentId())
                .build();

        Refund.create(refundParams);

        payment.setStatus(PaymentStatus.REFUNDED);
        payment = paymentRepository.save(payment);
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