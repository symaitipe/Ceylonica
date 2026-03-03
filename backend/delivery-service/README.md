# Delivery Service

## Overview
The Delivery Service manages all delivery and shipping operations for the Ceylonica platform. It integrates with local delivery providers (PickMe, Koombiyo) to handle package delivery across Sri Lanka.

## Port
- **8087**

## Features

### 🚚 Delivery Management
- Create delivery requests
- Track package location
- Update delivery status
- Estimated delivery times

### 🔗 Provider Integration
- **PickMe Delivery**: On-demand delivery service
- **Koombiyo Delivery**: Island-wide courier service
- Automatic provider selection
- Fallback provider support

### 📍 Real-time Tracking
- Live package tracking
- Status updates
- Delivery notifications
- Current location display

### 📊 Delivery Status Management
- Multiple delivery statuses
- Automatic status updates
- Delivery confirmation

## Delivery Providers

| Provider | Coverage | Features |
|----------|----------|----------|
| PickMe | Urban areas | Fast delivery, real-time tracking |
| Koombiyo | Island-wide | Reliable, cost-effective |

## Delivery Statuses

| Status | Description |
|--------|-------------|
| `PENDING` | Delivery request created |
| `PICKED_UP` | Package picked up from warehouse |
| `IN_TRANSIT` | Package on the way |
| `OUT_FOR_DELIVERY` | Package with delivery agent |
| `DELIVERED` | Successfully delivered |
| `FAILED` | Delivery attempt failed |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/delivery/request` | Create delivery request |

## Request/Response Examples

### Create Delivery
```json
POST /delivery
{
  "orderId": "order123",
  "address": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Colombo",
    "postalCode": "00100"
  },
  "provider": "koombiyo"
}

Response:
{
  "trackingId": "TRK123456",
  "orderId": "order123",
  "provider": "koombiyo",
  "status": "PENDING",
  "estimatedDelivery": "2-3 business days"
}
```

### Track Delivery
```json
GET /delivery/track/TRK123456

Response:
{
  "trackingId": "TRK123456",
  "status": "IN_TRANSIT",
  "currentLocation": "Colombo Distribution Center",
  "estimatedDelivery": "Tomorrow"
}
```

## Integration Classes
- `PickMeIntegration.java` - PickMe API integration
- `KoombiyoIntegration.java` - Koombiyo API integration

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_delivery`
- **Collection**: `deliveries`

## Configuration
```yaml
delivery:
  providers:
    pickme:
      api-url: https://api.pickme.lk
      api-key: your-pickme-api-key
    koombiyo:
      api-url: https://api.koombiyo.lk
      api-key: your-koombiyo-api-key
```

## Running the Service
```bash
mvn spring-boot:run
```

## Notes
- Configure API keys for delivery providers before deployment
- Default provider is Koombiyo for island-wide coverage
- PickMe recommended for Colombo metro area
