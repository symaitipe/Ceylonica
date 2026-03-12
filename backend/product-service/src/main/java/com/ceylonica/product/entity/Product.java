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
    private String productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private Integer categoryId;
    private List<String> cardImageURLs;
    private List<String> detailImageURLs;
    private Map<String, Object> additionalInformation;
    private Integer stockQuantity;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Product() {
    };

    public Product(String productId, String productName, String productDescription, BigDecimal productPrice,
            Integer categoryId, List<String> cardImageURLs, List<String> detailImageURLs,
            Map<String, Object> additionalInformation, Instant createdAt, Instant updatedAt) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.categoryId = categoryId;
        this.cardImageURLs = cardImageURLs;
        this.detailImageURLs = detailImageURLs;
        this.additionalInformation = additionalInformation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public List<String> getCardImageURLs() {
        return cardImageURLs;
    }

    public void setCardImageURLs(List<String> cardImageURLs) {
        this.cardImageURLs = cardImageURLs;
    }

    public List<String> getDetailImageURLs() {
        return detailImageURLs;
    }

    public void setDetailImageURLs(List<String> detailImageURLs) {
        this.detailImageURLs = detailImageURLs;
    }

    public Map<String, Object> getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(Map<String, Object> additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity){
        this.stockQuantity = stockQuantity;
    }
}
