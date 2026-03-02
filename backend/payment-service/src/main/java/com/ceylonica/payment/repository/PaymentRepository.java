package com.ceylonica.payment.repository;

import com.ceylonica.payment.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {

    Optional<Payment> findByOrderId(String orderId);

    List<Payment> findByUserId(String userId);

    Optional<Payment> findByStripePaymentIntentId(String paymentIntentId);
}