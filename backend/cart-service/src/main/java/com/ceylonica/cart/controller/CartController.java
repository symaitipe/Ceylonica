package com.ceylonica.cart.controller;

import com.ceylonica.cart.entity.Cart;
import com.ceylonica.cart.entity.CartItem;
import com.ceylonica.cart.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    private String getUserId(HttpServletRequest request) {
        return request.getHeader("X-User-Id");
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(HttpServletRequest request) {
        return ResponseEntity.ok(cartService.getCart(getUserId(request)));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItem(@RequestBody CartItem item,
                                        HttpServletRequest request) {
        return ResponseEntity.ok(cartService.addToCart(getUserId(request), item));
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Cart> updateQuantity(@PathVariable String productId,
                                               @RequestBody Map<String, Integer> body,
                                               HttpServletRequest request) {
        int quantity = body.get("quantity");
        return ResponseEntity.ok(cartService.updateQuantity(getUserId(request), productId, quantity));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeItem(@PathVariable String productId,
                                           HttpServletRequest request) {
        return ResponseEntity.ok(cartService.removeFromCart(getUserId(request), productId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(HttpServletRequest request) {
        cartService.clearCart(getUserId(request));
        return ResponseEntity.ok().build();
    }
}