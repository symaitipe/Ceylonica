package com.ceylonica.payment.model;

import com.ceylonica.payment.enums.PaymentStatus;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    @Indexed
    private String orderId;

    @Indexed
    private String userId;

    private Long amount;
    private String currency;

    private PaymentStatus status;

    private String stripePaymentIntentId;
    private String stripeClientSecret;
    private String failureMessage;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ===== Constructors =====

    public Payment() {
    }

    public Payment(String id, String orderId, String userId, Long amount, String currency,
                   PaymentStatus status, String stripePaymentIntentId, String stripeClientSecret,
                   String failureMessage, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.orderId = orderId;
        this.userId = userId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.stripePaymentIntentId = stripePaymentIntentId;
        this.stripeClientSecret = stripeClientSecret;
        this.failureMessage = failureMessage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // ===== Getters =====

    public String getId() { return id; }
    public String getOrderId() { return orderId; }
    public String getUserId() { return userId; }
    public Long getAmount() { return amount; }
    public String getCurrency() { return currency; }
    public PaymentStatus getStatus() { return status; }
    public String getStripePaymentIntentId() { return stripePaymentIntentId; }
    public String getStripeClientSecret() { return stripeClientSecret; }
    public String getFailureMessage() { return failureMessage; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // ===== Setters =====

    public void setId(String id) { this.id = id; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setAmount(Long amount) { this.amount = amount; }
    public void setCurrency(String currency) { this.currency = currency; }
    public void setStatus(PaymentStatus status) { this.status = status; }
    public void setStripePaymentIntentId(String stripePaymentIntentId) { this.stripePaymentIntentId = stripePaymentIntentId; }
    public void setStripeClientSecret(String stripeClientSecret) { this.stripeClientSecret = stripeClientSecret; }
    public void setFailureMessage(String failureMessage) { this.failureMessage = failureMessage; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // ===== Builder Pattern  =====

    public static class Builder {
        private String id;
        private String orderId;
        private String userId;
        private Long amount;
        private String currency;
        private PaymentStatus status;
        private String stripePaymentIntentId;
        private String stripeClientSecret;
        private String failureMessage;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder orderId(String orderId) {
            this.orderId = orderId;
            return this;
        }

        public Builder userId(String userId) {
            this.userId = userId;
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

        public Builder stripeClientSecret(String stripeClientSecret) {
            this.stripeClientSecret = stripeClientSecret;
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

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Payment build() {
            return new Payment(
                    id,
                    orderId,
                    userId,
                    amount,
                    currency,
                    status,
                    stripePaymentIntentId,
                    stripeClientSecret,
                    failureMessage,
                    createdAt,
                    updatedAt
            );
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}