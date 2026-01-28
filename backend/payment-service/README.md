# Payment Service

## Overview
The Payment Service handles all payment processing operations for the Ceylonica platform. It manages payment transactions, refunds, and payment status tracking.

## Port
- **8086**

## Features

### 💳 Payment Processing
- Process card payments
- Support Cash on Delivery (COD)
- Generate transaction IDs
- Record payment details

### 💰 Refund Management
- Process refunds for cancelled orders
- Track refund status
- Maintain refund records

### 📊 Transaction Tracking
- View payment status
- Transaction history
- Payment verification

### 🔒 Secure Transactions
- Secure payment data handling
- Transaction ID generation
- Payment validation

## Payment Methods

| Method | Code | Description |
|--------|------|-------------|
| Credit/Debit Card | `card` | Online card payment |
| Cash on Delivery | `cod` | Pay when delivered |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/process` | Process a payment |
| GET | `/payments/status/{transactionId}` | Get payment status |
| POST | `/payments/refund/{transactionId}` | Process refund |

## Request/Response Examples

### Process Payment
```json
POST /payments/process
{
  "orderId": "order123",
  "amount": 3000.00,
  "paymentMethod": "card"
}

Response:
{
  "transactionId": "txn_abc123",
  "orderId": "order123",
  "amount": 3000.00,
  "paymentMethod": "card",
  "status": "SUCCESS"
}
```

### Get Payment Status
```json
GET /payments/status/txn_abc123

Response:
{
  "transactionId": "txn_abc123",
  "status": "COMPLETED"
}
```

### Process Refund
```json
POST /payments/refund/txn_abc123

Response:
{
  "transactionId": "txn_abc123",
  "status": "REFUNDED"
}
```

## Payment Statuses

| Status | Description |
|--------|-------------|
| `SUCCESS` | Payment processed successfully |
| `FAILED` | Payment processing failed |
| `PENDING` | Payment awaiting confirmation |
| `COMPLETED` | Payment fully completed |
| `REFUNDED` | Payment refunded |

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_payments`
- **Collection**: `transactions`

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Future Enhancements
- Integration with payment gateways (Stripe, PayPal)
- Support for local payment methods
- Recurring payment support
- Payment analytics dashboard
