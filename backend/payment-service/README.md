# Payment Service API Documentation

Base URL:
http://localhost:8086/api/payments

---

## Create Payment

POST /api/payments

Headers:
X-User-Id: user-123
Content-Type: application/json

Request Body:
{
"orderId": "order-001",
"amount": 150000,
"currency": "usd"
}

Response:
Returns Stripe clientSecret and creates a PENDING payment record.

---

## Confirm Payment

POST /api/payments/confirm/{paymentIntentId}

Confirms payment after Stripe processing.
Updates payment status to SUCCESS or FAILED.

---

## Get Payment by ID

GET /api/payments/{paymentId}

Returns payment details.

---

## Get Payment by Order ID

GET /api/payments/order/{orderId}

Returns payment details for a given order.

---

## Get My Payments

GET /api/payments/my-payments

Headers:
X-User-Id: user-123

Returns all payments for current user.

---

## Admin Endpoints

### Get All Payments
GET /api/payments/admin/all
Header:
X-User-Role: ADMIN

### Refund Payment
POST /api/payments/{paymentId}/refund
Header:
X-User-Role: ADMIN

---

## Payment Status Flow

PENDING → SUCCESS → REFUNDED  
PENDING → FAILED

---

## Technology Stack

- Spring Boot
- MongoDB
- Stripe PaymentIntent API
- Spring Security (Stateless)
- REST API Architecture