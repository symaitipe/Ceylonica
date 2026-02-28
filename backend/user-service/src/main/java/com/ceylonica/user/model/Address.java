package com.ceylonica.user.model;

public class Address {
    private String street;
    private String city;
    private String postalCode;
    private String country;

    // Getters
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getPostalCode() { return postalCode; }
    public String getCountry() { return country; }

    // Setters
    public void setStreet(String street) { this.street = street; }
    public void setCity(String city) { this.city = city; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public void setCountry(String country) { this.country = country; }
}
