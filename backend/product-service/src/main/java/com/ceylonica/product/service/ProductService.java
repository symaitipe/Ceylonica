package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;
import java.io.IOException;

public interface ProductService {
    ProductDTO convertProducttoProductDTO(Product product);

    Product convertProductDTOtoProduct(ProductDTO productDTO) throws IOException;
}
