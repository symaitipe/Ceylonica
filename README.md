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

- Java 25+
- Maven 3.9.12
- Node.js 22+
- MongoDB
- Docker (optional)

### To Check

- Java version: `java --version`
- Node.js version: `node --version`
- Maven version: `mvn --version`

### Development Guidelines

Please refer to the [Instructions](docs/Instructions.md) before starting development. Detailed documentation is available below:
- [API Documentation](docs/API-Documentation.md)
- [Architecture Diagram](docs/Architecture-Diagram.md)
- [Software Requirements Specification (SRS)](docs/SRS.md)

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
