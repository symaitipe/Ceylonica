package com.ceylonica.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private Address address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    public static class Address {
        private String street;
        private String city;
        private String postalCode;
        private String country;
    }
}
