package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;

import java.util.ArrayList;
import java.util.List;

public class ProductServiceImpl implements ProductService {

    //Define image stored file path....
    
    private final String Image_Upload_Directory = "resources/static/images/";

    //convert productDTO's to product for store in database........

    public Product convertProductDTOtoProduct(ProductDTO productDTO)
    {
            Product product = new Product();

            product.setProductName(productDTO.getProductName());
            product.setProductPrice(productDTO.getProductPrice());
            product.setProductDescription(productDTO.getProductDescription());
            product.setCategoryId(productDTO.getCategoryId());
            product.setAdditionalInformation(productDTO.getAdditionalInformation());

            List<String> imageUrls = new ArrayList<>();




            return product;

    }
}
