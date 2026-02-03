package com.ceylonica.product.controller;

import com.ceylonica.product.model.ProductDTO;
import com.ceylonica.product.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @PostMapping(value = "/api/addproduct")
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO)
    {
        return productService.addProduct(productDTO);
    }

    @GetMapping(value = "/api/product/{id}")
    public ProductDTO getproduct(@PathVariable Integer productId)
    {
        return productService.getByProductId(productId);
    }

    
}
