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
    public ProductDTO addProduct(@ModelAttribute ProductDTO productDTO) {
        return productService.addProduct(productDTO);
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
    public ProductDTO updateProduct(@ModelAttribute ProductDTO productDTO) {
        return productService.updateProduct(productDTO);
    }

    @DeleteMapping(value = "/api/product/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        return productService.deleteProduct(productId);
    }
}
