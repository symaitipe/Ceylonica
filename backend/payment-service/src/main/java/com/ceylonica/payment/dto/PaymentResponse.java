package com.ceylonica.payment.dto;

import com.ceylonica.payment.enums.PaymentStatus;
import java.time.LocalDateTime;

public class PaymentResponse {

    private String paymentId;
    private String orderId;
    private Long amount;
    private String currency;
    private PaymentStatus status;

    private String stripePaymentIntentId;
    private String clientSecret;
    private String failureMessage;

    private LocalDateTime createdAt;

    // Default constructor
    public PaymentResponse() {
    }

    // All-args constructor (useful internally)
    public PaymentResponse(String paymentId, String orderId, Long amount, String currency,
                           PaymentStatus status, String stripePaymentIntentId,
                           String clientSecret, String failureMessage,
                           LocalDateTime createdAt) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.stripePaymentIntentId = stripePaymentIntentId;
        this.clientSecret = clientSecret;
        this.failureMessage = failureMessage;
        this.createdAt = createdAt;
    }

    // Getters
    public String getPaymentId() { return paymentId; }
    public String getOrderId() { return orderId; }
    public Long getAmount() { return amount; }
    public String getCurrency() { return currency; }
    public PaymentStatus getStatus() { return status; }
    public String getStripePaymentIntentId() { return stripePaymentIntentId; }
    public String getClientSecret() { return clientSecret; }
    public String getFailureMessage() { return failureMessage; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Setters
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public void setAmount(Long amount) { this.amount = amount; }
    public void setCurrency(String currency) { this.currency = currency; }
    public void setStatus(PaymentStatus status) { this.status = status; }
    public void setStripePaymentIntentId(String stripePaymentIntentId) { this.stripePaymentIntentId = stripePaymentIntentId; }
    public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
    public void setFailureMessage(String failureMessage) { this.failureMessage = failureMessage; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // ===== Builder Pattern  =====
    public static class Builder {
        private String paymentId;
        private String orderId;
        private Long amount;
        private String currency;
        private PaymentStatus status;
        private String stripePaymentIntentId;
        private String clientSecret;
        private String failureMessage;
        private LocalDateTime createdAt;

        public Builder paymentId(String paymentId) {
            this.paymentId = paymentId;
            return this;
        }

        public Builder orderId(String orderId) {
            this.orderId = orderId;
            return this;
        }

        public Builder amount(Long amount) {
            this.amount = amount;
            return this;
        }

        public Builder currency(String currency) {
            this.currency = currency;
            return this;
        }

        public Builder status(PaymentStatus status) {
            this.status = status;
            return this;
        }

        public Builder stripePaymentIntentId(String stripePaymentIntentId) {
            this.stripePaymentIntentId = stripePaymentIntentId;
            return this;
        }

        public Builder clientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
            return this;
        }

        public Builder failureMessage(String failureMessage) {
            this.failureMessage = failureMessage;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public PaymentResponse build() {
            return new PaymentResponse(
                    paymentId,
                    orderId,
                    amount,
                    currency,
                    status,
                    stripePaymentIntentId,
                    clientSecret,
                    failureMessage,
                    createdAt
            );
        }
    }

    // Static builder method
    public static Builder builder() {
        return new Builder();
    }
}