package com.ceylonica.cart.repository;

import com.ceylonica.cart.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
}
