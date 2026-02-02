package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;

public class ProductServiceImpl implements ProductService {


    public Product convertProductDTOtoProduct(ProductDTO productDTO)
    {
            Product product = new Product();

            product.setProductName(productDTO.getProductName());
            product.setProductPrice(productDTO.getProductPrice());
            product.setProductDescription(productDTO.getProductDescription());
            product.setCategoryId(productDTO.getCategoryId());
            product.setAdditionalInformation(productDTO.getAdditionalInformation());



            return product;

    }
}
