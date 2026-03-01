package com.ceylonica.order.model.DTOs;

import com.ceylonica.order.model.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    private OrderStatus status;
}