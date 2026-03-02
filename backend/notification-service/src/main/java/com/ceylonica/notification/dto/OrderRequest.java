package com.ceylonica.notification.dto;

public class OrderRequest {
    private String email;
    private String orderId;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
}