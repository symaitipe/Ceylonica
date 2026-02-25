# Ceylonica - Order Service

Order Management Microservice for the **Ceylonica Organic E-Commerce Platform**.

This service is responsible for managing customer orders, including order creation, retrieval, status updates, and cancellation.

---

## 🔧 Tech Stack

- Java 25
- Spring Boot 4.x
- Spring Data MongoDB
- Spring Cloud (Eureka Client)
- MongoDB
- OpenAPI (Swagger)

---

## 🚀 Service Information

- **Service Name:** order-service
- **Port:** 8085
- **Base URL:** http://localhost:8085
- **Database:** MongoDB (`ceylonica_orders`)
- **API Documentation:** http://localhost:8085/swagger-ui/index.html

---

# 📌 API Endpoints

---

## 1️⃣ Create Order

**POST** `/orders`

### Description
Creates a new customer order.

### Request Body
```json
{
  "userId": "user001",
  "customerName": "Sahan Yasas",
  "items": [
    {
      "productId": "prod101",
      "productName": "Organic Ceylon Tea",
      "quantity": 2,
      "price": 1500
    }
  ],
  "shippingAddress": {
    "fullName": "Sahan Yasas",
    "address": "No 12, Kalutara",
    "city": "Kalutara",
    "postalCode": "12000",
    "phone": "0712345678"
  },
  "paymentMethod": "CARD"
}
```

### Response
- **201 Created**
- Returns created order object
- Initial status: `PENDING`
- `totalAmount` calculated automatically

---

## 2️⃣ Get Orders by User ID

**GET** `/orders?userId=user001`

### Description
Retrieves all orders placed by a specific user.

### Response
- **200 OK**
- Returns list of orders

---

## 3️⃣ Get Order by ID

**GET** `/orders/{id}`

### Description
Retrieves a specific order using its unique ID.

### Response
- **200 OK** – Order found
- **404 Not Found** – If order does not exist

---

## 4️⃣ Get All Orders (Admin)

**GET** `/orders/all`

### Description
Retrieves all orders in the system (Admin usage).

### Response
- **200 OK**

---

## 5️⃣ Update Order Status

**PATCH** `/orders/{id}/status`

### Description
Updates the status of an existing order.

### Request Body
```json
{
  "status": "SHIPPED"
}
```

### Allowed Status Values
- `PENDING`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

### Response
- **200 OK**
- Returns updated order object

---

## 6️⃣ Cancel Order

**DELETE** `/orders/{id}`

### Description
Cancels an order if it has not been shipped or delivered.

### Response
- **204 No Content** – Successfully cancelled
- **400 Bad Request** – If order is already SHIPPED or DELIVERED
- **404 Not Found** – If order does not exist

---

# 📊 Business Rules

- Order status is initially set to `PENDING`
- Total amount is calculated automatically from order items
- Orders cannot be cancelled after they are `SHIPPED` or `DELIVERED`
- Proper HTTP status codes are returned
- Global exception handling implemented

---

# 🧪 API Testing

All endpoints were tested using:

- Postman
- Swagger UI

Tested scenarios include:
- Successful order creation
- Order retrieval
- Status update
- Invalid cancellation attempt
- Order not found handling

---

# 📘 OpenAPI Documentation

Interactive API documentation is available at:

```
http://localhost:8085/swagger-ui/index.html
```

---

# 🏗 Microservice Architecture Role

The Order Service:

- Manages order lifecycle
- Communicates with other services (future integration):
    - Product Service
    - Payment Service
    - Delivery Service
- Registers with Eureka (when enabled)
- Uses MongoDB for data persistence

---

# 👨‍💻 Author

Order Service developed as part of the **Ceylonica Microservices Architecture Project**.