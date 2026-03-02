package com.ceylonica.notification.dto;

public class ShippingRequest {
    private String email;
    private String orderId;
    private String trackingId;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }
}