package com.ceylonica.cart.service;

import com.ceylonica.cart.entity.Cart;
import com.ceylonica.cart.entity.CartItem;

public interface CartService {

    Cart getCart(String userId);

    Cart addToCart(String userId, CartItem newItem);

    Cart updateQuantity(String userId, String productId, int quantity);

    Cart removeFromCart(String userId, String productId);

    void clearCart(String userId);
}