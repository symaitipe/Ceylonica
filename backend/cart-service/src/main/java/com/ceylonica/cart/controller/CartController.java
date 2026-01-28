package com.ceylonica.cart.controller;

import com.ceylonica.cart.model.Cart;
import com.ceylonica.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {
    
    private final CartService cartService;
    
    @GetMapping
    public Cart getCart(@RequestHeader("X-User-Id") String userId) {
        return cartService.getCart(userId);
    }
    
    @PostMapping("/items")
    public Cart addItem(@RequestHeader("X-User-Id") String userId, @RequestBody Cart.CartItem item) {
        return cartService.addItem(userId, item);
    }
    
    @PutMapping("/items/{itemId}")
    public Cart updateItemQuantity(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String itemId,
            @RequestBody Map<String, Integer> body) {
        return cartService.updateItemQuantity(userId, itemId, body.get("quantity"));
    }
    
    @DeleteMapping("/items/{itemId}")
    public Cart removeItem(@RequestHeader("X-User-Id") String userId, @PathVariable String itemId) {
        return cartService.removeItem(userId, itemId);
    }
    
    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestHeader("X-User-Id") String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
