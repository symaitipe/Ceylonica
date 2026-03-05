package com.ceylonica.payment.model;

import com.ceylonica.payment.enums.PaymentStatus;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
