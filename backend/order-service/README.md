# Order Service

## Overview
The Order Service handles all order-related operations for the Ceylonica platform. It manages order creation, tracking, status updates, and order history for customers and administrators.

## Port
- **8085**

## Features

### 📝 Order Creation
- Create new orders from cart
- Capture shipping information
- Record payment method
- Calculate order totals

### 📦 Order Tracking
- Track order status in real-time
- View order history
- Get detailed order information

### 🔄 Order Status Management
- Multiple order statuses
- Admin status updates
- Automatic status notifications

### 📊 Order History
- View all past orders
- Filter by status
- Order details with items

### ❌ Order Cancellation
- Cancel pending orders
- Automatic refund trigger
- Status update to CANCELLED

## Order Statuses

| Status | Description |
|--------|-------------|
| `PENDING` | Order placed, awaiting processing |
| `PROCESSING` | Order being prepared |
| `SHIPPED` | Order dispatched for delivery |
| `DELIVERED` | Order delivered to customer |
| `CANCELLED` | Order cancelled |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create new order |
| GET | `/orders` | Get user's orders |
| GET | `/orders/all` | Get all orders (Admin) |
| GET | `/orders/{id}` | Get order by ID |
| PATCH | `/orders/{id}/status` | Update order status (Admin) |
| DELETE | `/orders/{id}` | Cancel order |

## Data Model

### Order
```json
{
  "id": "string",
  "userId": "string",
  "customerName": "string",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": 2,
      "price": 1500.00
    }
  ],
  "shippingAddress": {
    "fullName": "string",
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "phone": "string"
  },
  "paymentMethod": "card",
  "status": "PENDING",
  "totalAmount": 3000.00,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_orders`
- **Collection**: `orders`
- **Indexes**: userId, status, createdAt

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Integration Points
- **Cart Service**: Retrieves cart items for order
- **Payment Service**: Processes payment
- **Delivery Service**: Creates delivery request
- **Notification Service**: Sends order confirmations
