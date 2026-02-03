package com.ceylonica.product.repository;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, Integer> {

    public Product save(Product product);

    public Optional<Product> findById(Integer productId);

    public ArrayList<Product> findAll();
}
