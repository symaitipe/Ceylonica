package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;
import com.mongodb.lang.NonNull;

import java.io.IOException;
import java.util.ArrayList;

public interface ProductService {
    @NonNull
    ProductDTO convertProducttoProductDTO(Product product);

    @NonNull
    Product convertProductDTOtoProduct(ProductDTO productDTO) throws IOException;

    ProductDTO addProduct(ProductDTO productDTO);

    ProductDTO getByProductId(String productId);

    ArrayList<ProductDTO> getAllProducts();

    ProductDTO updateProduct(ProductDTO productDTO);

    String deleteProduct(String productId);
}
