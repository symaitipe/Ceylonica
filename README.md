# Ceylonica

A microservices-based e-commerce platform built with Spring Boot and React.

## Project Structure

- **frontend/** - React Application
- **backend/** - Spring Boot Microservices
  - api-gateway - Spring Cloud Gateway
  - service-registry - Eureka Server
  - auth-service - Authentication & JWT
  - user-service - User Management
  - product-service - Product Catalog
  - cart-service - Shopping Cart
  - order-service - Order Management
  - payment-service - Payment Processing
  - delivery-service - Delivery Integration
  - review-service - Product Reviews
  - notification-service - Notifications
- **database/** - MongoDB initialization scripts
- **docker/** - Docker configuration
- **docs/** - Documentation

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MongoDB
- Docker (optional)

### Running the Application

1. Start the Service Registry (Eureka Server)
2. Start the API Gateway
3. Start the microservices
4. Start the React frontend

## Architecture

This project follows a microservices architecture with:
- Service Discovery (Eureka)
- API Gateway (Spring Cloud Gateway)
- JWT Authentication
- MongoDB for data persistence

## License

MIT License
