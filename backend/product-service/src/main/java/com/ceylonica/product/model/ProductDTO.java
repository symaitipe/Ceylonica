package com.ceylonica.product.model;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class ProductDTO {

    private String productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private Integer categoryId;
    private List<MultipartFile> cardImages;
    private List<MultipartFile> detailImages;
    private List<String> cardImageUrls;
    private List<String> detailImageUrls;
    private Map<String, Object> additionalInformation;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer stockQuantity;

    public ProductDTO(String productName, String productDescription, BigDecimal productPrice, Integer categoryId,
            List<MultipartFile> cardImages, List<MultipartFile> detailImages, Map<String, Object> additionalInformation,
            LocalDateTime createdAt,
            LocalDateTime updatedAt, Integer stockQuantity) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.categoryId = categoryId;
        this.cardImages = cardImages;
        this.detailImages = detailImages;
        this.additionalInformation = additionalInformation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.stockQuantity = stockQuantity;
    }

    public ProductDTO() {
    };

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

    public List<MultipartFile> getCardImages() {
        return cardImages;
    }

    public void setCardImages(List<MultipartFile> cardImages) {
        this.cardImages = cardImages;
    }

    public List<MultipartFile> getDetailImages() {
        return detailImages;
    }

    public void setDetailImages(List<MultipartFile> detailImages) {
        this.detailImages = detailImages;
    }

    public List<String> getCardImageUrls() {
        return cardImageUrls;
    }

    public void setCardImageUrls(List<String> cardImageUrls) {
        this.cardImageUrls = cardImageUrls;
    }

    public List<String> getDetailImageUrls() {
        return detailImageUrls;
    }

    public void setDetailImageUrls(List<String> detailImageUrls) {
        this.detailImageUrls = detailImageUrls;
    }

    public Map<String, Object> getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(Map<String, Object> additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStockQuantity() { return stockQuantity; }

    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

}
