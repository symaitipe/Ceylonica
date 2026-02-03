package com.ceylonica.product.controller;

import com.ceylonica.product.model.ProductDTO;
import com.ceylonica.product.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @PostMapping(value = "/api/addproduct")
    public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO productDTO) {
        try {
            return ResponseEntity.ok(productService.addProduct(productDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding product: " + e.getMessage());
        }
    }

    @GetMapping(value = "/api/product/{productId}")
    public ProductDTO getProduct(@PathVariable String productId) {
        return productService.getByProductId(productId);
    }

    @GetMapping(value = "/api/productlist")
    public ArrayList<ProductDTO> getProductList() {
        return productService.getAllProducts();
    }

    @PutMapping(value = "/api/updateproduct")
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductDTO productDTO) {
        try {
            return ResponseEntity.ok(productService.updateProduct(productDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating product: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/api/product/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        return productService.deleteProduct(productId);
    }
}
