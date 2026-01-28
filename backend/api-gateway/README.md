# API Gateway Service

## Overview
The API Gateway is the single entry point for all client requests to the Ceylonica microservices ecosystem. Built with Spring Cloud Gateway, it handles routing, load balancing, and cross-cutting concerns.

## Port
- **8080**

## Features

### 🚀 Request Routing
- Routes incoming requests to appropriate microservices
- Path-based routing configuration
- Service discovery integration with Eureka

### ⚖️ Load Balancing
- Client-side load balancing using Spring Cloud LoadBalancer
- Distributes traffic across multiple service instances

### 🔒 Security
- CORS (Cross-Origin Resource Sharing) handling
- Request filtering and validation
- JWT token validation (optional)

### 📊 Monitoring
- Health check endpoints via Spring Actuator
- Request/response logging
- Metrics collection

## Route Configuration

| Path | Service | Description |
|------|---------|-------------|
| `/api/auth/**` | auth-service | Authentication endpoints |
| `/api/users/**` | user-service | User management |
| `/api/products/**` | product-service | Product catalog |
| `/api/cart/**` | cart-service | Shopping cart |
| `/api/orders/**` | order-service | Order management |
| `/api/payments/**` | payment-service | Payment processing |
| `/api/delivery/**` | delivery-service | Delivery tracking |
| `/api/reviews/**` | review-service | Product reviews |
| `/api/notifications/**` | notification-service | Notifications |

## Dependencies
- Spring Cloud Gateway
- Spring Cloud Netflix Eureka Client
- Spring Boot Actuator

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## API Documentation
Access the gateway at: `http://localhost:8080`
