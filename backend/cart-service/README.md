# Cart Service

## Overview
The Cart Service manages shopping cart functionality for the Ceylonica platform. It handles adding/removing products, updating quantities, and maintaining cart state for both authenticated users and guest sessions.

## Port
- **8084**

## Features

### 🛒 Cart Management
- Add products to cart
- Remove products from cart
- Update item quantities
- Clear entire cart

### 💾 Cart Persistence
- Persistent cart for logged-in users
- Cart data stored in MongoDB
- Automatic cart creation for new users

### 📊 Cart Operations
- View cart contents
- Calculate cart totals
- Track item quantities

### 🔄 Real-time Updates
- Instant cart updates
- Stock validation before adding
- Quantity limits enforcement

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/{userId}` | Get user's cart |
| POST | `/api/cart/{userId}/add` | Add item to cart |
| DELETE | `/api/cart/{userId}/remove/{productId}` | Remove item from cart |
| DELETE | `/api/cart/{userId}/clear` | Clear entire cart |

## Request Headers
| Header | Description |
|--------|-------------|
| `X-User-Id` | User identifier for cart association |

## Data Model

### Cart
```json
{
  "id": "string",
  "userId": "string",
  "items": [
    {
      "id": "string",
      "productId": "string",
      "name": "string",
      "imageUrl": "string",
      "price": 1500.00,
      "quantity": 2
    }
  ],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Add Item Request
```json
{
  "productId": "123",
  "name": "Ceylon Tea",
  "imageUrl": "https://...",
  "price": 1500.00,
  "quantity": 2
}
```

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_cart`
- **Collection**: `carts`
- **Index**: userId (unique)

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Business Rules
1. One cart per user
2. Duplicate products increase quantity instead of creating new items
3. Quantity must be at least 1 (removing sets to 0 deletes item)
4. Cart is cleared after successful order placement
