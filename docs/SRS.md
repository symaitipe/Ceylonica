# Software Requirements Specification (SRS)

## Ceylonica E-Commerce Platform

### Version 1.0
### Date: January 2026

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for Ceylonica, a microservices-based e-commerce platform for Sri Lankan products.

### 1.2 Scope
Ceylonica is a full-stack e-commerce application that enables users to browse, purchase, and receive Sri Lankan products. The system includes user authentication, product catalog, shopping cart, order management, payment processing, delivery tracking, and notifications.

### 1.3 Definitions
- **Microservices**: An architectural style that structures an application as a collection of loosely coupled services.
- **API Gateway**: A server that acts as an API front-end, receives API requests, and routes them to appropriate backend services.
- **JWT**: JSON Web Token, used for secure authentication.

---

## 2. Overall Description

### 2.1 Product Perspective
Ceylonica is a standalone e-commerce platform built using:
- **Frontend**: React.js
- **Backend**: Spring Boot microservices
- **Database**: MongoDB
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway

### 2.2 Product Functions
1. User registration and authentication
2. Product browsing and search
3. Shopping cart management
4. Order placement and tracking
5. Payment processing
6. Delivery management
7. Product reviews
8. Email notifications

### 2.3 User Classes
1. **Guest User**: Can browse products
2. **Registered User**: Can purchase products and track orders
3. **Admin User**: Can manage products, orders, and users

---

## 3. Functional Requirements

### 3.1 Authentication Service
- FR-AUTH-01: Users shall be able to register with email and password
- FR-AUTH-02: Users shall be able to login with credentials
- FR-AUTH-03: System shall issue JWT tokens for authenticated sessions
- FR-AUTH-04: System shall support token refresh mechanism

### 3.2 Product Service
- FR-PROD-01: System shall display all available products
- FR-PROD-02: Users shall be able to search products by name
- FR-PROD-03: Users shall be able to filter products by category
- FR-PROD-04: Admin shall be able to add/update/delete products
- FR-PROD-05: System shall track product inventory

### 3.3 Cart Service
- FR-CART-01: Users shall be able to add products to cart
- FR-CART-02: Users shall be able to update cart item quantities
- FR-CART-03: Users shall be able to remove items from cart
- FR-CART-04: System shall persist cart for authenticated users

### 3.4 Order Service
- FR-ORD-01: Users shall be able to place orders
- FR-ORD-02: Users shall be able to view order history
- FR-ORD-03: Users shall be able to track order status
- FR-ORD-04: Admin shall be able to update order status

### 3.5 Payment Service
- FR-PAY-01: System shall process card payments
- FR-PAY-02: System shall support cash on delivery
- FR-PAY-03: System shall generate transaction records

### 3.6 Delivery Service
- FR-DEL-01: System shall integrate with delivery providers
- FR-DEL-02: Users shall be able to track deliveries
- FR-DEL-03: System shall update delivery status

### 3.7 Review Service
- FR-REV-01: Users shall be able to submit product reviews
- FR-REV-02: System shall display product ratings

### 3.8 Notification Service
- FR-NOT-01: System shall send order confirmation emails
- FR-NOT-02: System shall send shipping notifications

---

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-PERF-01: API response time shall be under 2 seconds
- NFR-PERF-02: System shall handle 1000 concurrent users

### 4.2 Security
- NFR-SEC-01: All passwords shall be encrypted
- NFR-SEC-02: All API communications shall use HTTPS
- NFR-SEC-03: JWT tokens shall expire after 24 hours

### 4.3 Availability
- NFR-AVL-01: System shall have 99.9% uptime
- NFR-AVL-02: Services shall support horizontal scaling

### 4.4 Maintainability
- NFR-MNT-01: Services shall be independently deployable
- NFR-MNT-02: Services shall use consistent logging

---

## 5. System Architecture

### 5.1 Architecture Overview
```
                    ┌─────────────────┐
                    │    Frontend     │
                    │   (React.js)    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │ (Spring Cloud)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼───────┐   ┌───────▼───────┐   ┌───────▼───────┐
│  Auth Service │   │Product Service│   │ Order Service │
└───────────────┘   └───────────────┘   └───────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                    ┌────────▼────────┐
                    │    MongoDB      │
                    └─────────────────┘
```

### 5.2 Service Communication
- Synchronous: REST APIs
- Service Discovery: Eureka Server

---

## 6. Database Design

### 6.1 Users Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "roles": ["String"],
  "createdAt": "Date"
}
```

### 6.2 Products Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Decimal",
  "stock": "Integer",
  "category": "String",
  "imageUrl": "String"
}
```

### 6.3 Orders Collection
```json
{
  "_id": "ObjectId",
  "userId": "String",
  "items": [{"productId", "quantity", "price"}],
  "status": "String",
  "totalAmount": "Decimal"
}
```

---

## 7. Appendix

### 7.1 Technologies Used
- Java 17
- Spring Boot 3.2
- React 18
- MongoDB 7.0
- Docker
- Nginx

### 7.2 References
- Spring Cloud Documentation
- React Documentation
- MongoDB Documentation
