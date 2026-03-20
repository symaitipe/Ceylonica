package com.ceylonica.product.controller;

import com.ceylonica.product.model.ProductDTO;
import com.ceylonica.product.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @PostMapping(value = "/addproduct")
    public ProductDTO addProduct(@ModelAttribute ProductDTO productDTO) {
        return productService.addProduct(productDTO);
    }

    @GetMapping(value = "/{productId}")
    public ProductDTO getProduct(@PathVariable String productId) {
        return productService.getByProductId(productId);
    }

    @GetMapping(value = "/productlist")
    public ArrayList<ProductDTO> getProductList() {
        return productService.getAllProducts();
    }

    @GetMapping(value = "/productsearch")
    public ArrayList<ProductDTO> searchProduct(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }

    @PutMapping(value = "/updateproduct")
    public ProductDTO updateProduct(@ModelAttribute ProductDTO productDTO) {
        return productService.updateProduct(productDTO);
    }

    @DeleteMapping(value = "/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        return productService.deleteProduct(productId);
    }

    // ── Stock endpoints (internal use only — not exposed via gateway) ──

    @PostMapping("/{productId}/check-stock")
    public ResponseEntity<Boolean> checkStock(@PathVariable String productId,
                                              @RequestParam int quantity) {
        boolean inStock = productService.checkStock(productId, quantity);
        return ResponseEntity.ok(inStock);
    }

    @PostMapping("/{productId}/reduce-stock")
    public ResponseEntity<Void> reduceStock(@PathVariable String productId,
                                            @RequestParam int quantity) {
        productService.reduceStock(productId, quantity);
        return ResponseEntity.ok().build();
    }

    // ── Rating endpoint (called by review service) ──

    @PutMapping("/{productId}/rating")
    public ResponseEntity<Void> updateRating(@PathVariable String productId,
                                             @RequestParam double averageRating,
                                             @RequestParam int totalReviews) {
        productService.updateRating(productId, averageRating, totalReviews);
        return ResponseEntity.ok().build();
    }
}
