# Ceylonica API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Products

### Get All Products
```http
GET /products
```

### Get Product by ID
```http
GET /products/{id}
```

### Search Products
```http
GET /products/search?q={query}
```

### Get Products by Category
```http
GET /products/category/{category}
```

### Create Product (Admin)
```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ceylon Tea",
  "description": "Premium Ceylon black tea",
  "price": 1500.00,
  "stock": 100,
  "category": "Tea",
  "imageUrl": "https://example.com/tea.jpg"
}
```

### Update Product (Admin)
```http
PUT /products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ceylon Tea - Premium",
  "price": 1800.00,
  "stock": 80
}
```

### Delete Product (Admin)
```http
DELETE /products/{id}
Authorization: Bearer {token}
```

---

## Cart

### Get Cart
```http
GET /cart
Authorization: Bearer {token}
```

### Add Item to Cart
```http
POST /cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "123",
  "quantity": 2
}
```

### Update Cart Item Quantity
```http
PUT /cart/items/{itemId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove Item from Cart
```http
DELETE /cart/items/{itemId}
Authorization: Bearer {token}
```

### Clear Cart
```http
DELETE /cart
Authorization: Bearer {token}
```

---

## Orders

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "123",
      "quantity": 2,
      "price": 1500.00
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Colombo",
    "postalCode": "00100",
    "phone": "+94771234567"
  },
  "paymentMethod": "card",
  "totalAmount": 3000.00
}
```

### Get User Orders
```http
GET /orders
Authorization: Bearer {token}
```

### Get Order by ID
```http
GET /orders/{id}
Authorization: Bearer {token}
```

### Update Order Status (Admin)
```http
PATCH /orders/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

### Cancel Order
```http
DELETE /orders/{id}
Authorization: Bearer {token}
```

---

## Payments

### Process Payment
```http
POST /payments/process
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "123",
  "amount": 3000.00,
  "paymentMethod": "card"
}
```

### Get Payment Status
```http
GET /payments/status/{transactionId}
Authorization: Bearer {token}
```

### Refund Payment
```http
POST /payments/refund/{transactionId}
Authorization: Bearer {token}
```

---

## Delivery

### Create Delivery
```http
POST /delivery
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "123",
  "address": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Colombo",
    "postalCode": "00100"
  },
  "provider": "koombiyo"
}
```

### Track Delivery
```http
GET /delivery/track/{trackingId}
```

### Update Delivery Status
```http
PATCH /delivery/{trackingId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "DELIVERED"
}
```

---

## Reviews

### Create Review
```http
POST /reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "123",
  "rating": 5,
  "comment": "Excellent product!"
}
```

### Get Product Reviews
```http
GET /reviews/product/{productId}
```

### Get Product Rating Summary
```http
GET /reviews/product/{productId}/summary
```

---

## Notifications

### Send Email
```http
POST /notifications/email
Authorization: Bearer {token}
Content-Type: application/json

{
  "to": "customer@example.com",
  "subject": "Order Update",
  "body": "Your order has been shipped."
}
```

### Send Order Confirmation
```http
POST /notifications/order-confirmation
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "customer@example.com",
  "orderId": "123"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

---

## Service Ports

| Service | Port |
|---------|------|
| API Gateway | 8080 |
| Service Registry | 8761 |
| Auth Service | 8081 |
| User Service | 8082 |
| Product Service | 8083 |
| Cart Service | 8084 |
| Order Service | 8085 |
| Payment Service | 8086 |
| Delivery Service | 8087 |
| Review Service | 8088 |
| Notification Service | 8089 |
| Frontend | 3000 |
| MongoDB | 27017 |
