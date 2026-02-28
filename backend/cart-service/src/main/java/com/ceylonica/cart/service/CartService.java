package com.ceylonica.cart.service;

import com.ceylonica.cart.entity.Cart;
import com.ceylonica.cart.entity.CartItem;

public interface CartService {
    Cart getCart(String userId);

    Cart addToCart(String userId, CartItem item);

    Cart removeFromCart(String userId, String productId);

    void clearCart(String userId);
}
