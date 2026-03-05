package com.ceylonica.payment.dto;

import lombok.Builder;
import lombok.Data;
import com.ceylonica.payment.enums.PaymentStatus;
import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {

    private String paymentId;
    private String orderId;
    private Long amount;
    private String currency;
    private PaymentStatus status;

    private String stripePaymentIntentId;
    private String clientSecret;        // Frontend uses this to confirm payment with Stripe.js
    private String failureMessage;

    private LocalDateTime createdAt;
}