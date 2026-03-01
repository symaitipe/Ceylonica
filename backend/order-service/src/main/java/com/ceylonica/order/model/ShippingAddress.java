package com.ceylonica.order.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddress {
    private String fullName;
    private String address;
    private String city;
    private String postalCode;
    private String phone;
}
