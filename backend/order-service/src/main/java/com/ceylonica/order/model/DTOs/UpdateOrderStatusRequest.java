package com.ceylonica.order.model.DTOs;

import com.ceylonica.order.model.OrderStatus;



public class UpdateOrderStatusRequest {
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    private OrderStatus status;


}