package com.ceylonica.product.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Document(collection = "products")
public class Product {

    @Id
    private Integer productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private Integer categoryId;
    private List<String> productImagesURL;
    private Map<String, Object> additionalInformation;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;


}
