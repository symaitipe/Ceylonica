package com.ceylonica.order.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface ProductClient {

    @PostMapping("/api/products/{productId}/check-stock")
    boolean checkStock(@PathVariable("productId") String productId,
                       @RequestParam("quantity") int quantity);

    @PostMapping("/api/products/{productId}/reduce-stock")
    void reduceStock(@PathVariable("productId") String productId,
                     @RequestParam("quantity") int quantity);
}