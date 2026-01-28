package com.ceylonica.cart.service;

import com.ceylonica.cart.model.Cart;
import com.ceylonica.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;
    
    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
    }
    
    private Cart createNewCart(String userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setCreatedAt(LocalDateTime.now());
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }
    
    public Cart addItem(String userId, Cart.CartItem item) {
        Cart cart = getCart(userId);
        
        Optional<Cart.CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();
        
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + item.getQuantity());
        } else {
            item.setId(UUID.randomUUID().toString());
            cart.getItems().add(item);
        }
        
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }
    
    public Cart updateItemQuantity(String userId, String itemId, int quantity) {
        Cart cart = getCart(userId);
        
        cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));
        
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }
    
    public Cart removeItem(String userId, String itemId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }
    
    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }
}
