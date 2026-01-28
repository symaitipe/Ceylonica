package com.ceylonica.product.service;

import com.ceylonica.product.model.Product;
import com.ceylonica.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }
    
    public Product createProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        product.setInStock(product.getStock() > 0);
        return productRepository.save(product);
    }
    
    public Product updateProduct(String id, Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setDescription(productDetails.getDescription());
                    product.setPrice(productDetails.getPrice());
                    product.setStock(productDetails.getStock());
                    product.setCategory(productDetails.getCategory());
                    product.setImageUrl(productDetails.getImageUrl());
                    product.setInStock(productDetails.getStock() > 0);
                    product.setUpdatedAt(LocalDateTime.now());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
    
    public void updateStock(String id, int quantity) {
        productRepository.findById(id)
                .ifPresent(product -> {
                    product.setStock(product.getStock() - quantity);
                    product.setInStock(product.getStock() > 0);
                    productRepository.save(product);
                });
    }
}
