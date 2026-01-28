# Service Registry (Eureka Server)

## Overview
The Service Registry is the central service discovery component for the Ceylonica microservices architecture. Built with Netflix Eureka Server, it enables services to find and communicate with each other without hardcoding hostname and port.

## Port
- **8761**

## Features

### 🔍 Service Discovery
- Automatic registration of microservices
- Service instance lookup by name
- Real-time service availability tracking

### 💓 Health Monitoring
- Heartbeat mechanism for service health
- Automatic removal of unhealthy instances
- Service status dashboard

### 📋 Service Registry Dashboard
- Web-based UI for monitoring registered services
- View all registered service instances
- Check service health status

### 🔄 High Availability
- Self-preservation mode during network partitions
- Supports peer-to-peer replication (cluster mode)
- Fault-tolerant service discovery

## Registered Services

| Service Name | Description |
|--------------|-------------|
| API-GATEWAY | API Gateway service |
| AUTH-SERVICE | Authentication service |
| USER-SERVICE | User management service |
| PRODUCT-SERVICE | Product catalog service |
| CART-SERVICE | Shopping cart service |
| ORDER-SERVICE | Order management service |
| PAYMENT-SERVICE | Payment processing service |
| DELIVERY-SERVICE | Delivery management service |
| REVIEW-SERVICE | Product review service |
| NOTIFICATION-SERVICE | Notification service |

## Dependencies
- Spring Cloud Netflix Eureka Server

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Dashboard Access
Access the Eureka Dashboard at: `http://localhost:8761`

## Important Notes
- Start this service FIRST before starting other microservices
- All other services depend on Service Registry for discovery
- Default self-preservation is enabled for production stability
