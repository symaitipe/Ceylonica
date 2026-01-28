# Notification Service

## Overview
The Notification Service handles all communication and notification operations for the Ceylonica platform. It sends email notifications for order updates, shipping information, and promotional content.

## Port
- **8089**

## Features

### 📧 Email Notifications
- Send custom emails
- HTML email support
- Email templates
- Attachment support (future)

### 📦 Order Notifications
- Order confirmation emails
- Order status updates
- Payment confirmation

### 🚚 Shipping Notifications
- Shipping confirmation
- Tracking information
- Delivery updates
- Delivery confirmation

### 📢 Promotional Notifications (Future)
- Marketing emails
- Special offers
- Newsletter subscriptions

## Notification Types

| Type | Trigger | Description |
|------|---------|-------------|
| Order Confirmation | Order placed | Confirms order details |
| Payment Received | Payment success | Confirms payment |
| Order Shipped | Status → SHIPPED | Includes tracking info |
| Out for Delivery | Status → OUT_FOR_DELIVERY | Delivery day notice |
| Delivered | Status → DELIVERED | Delivery confirmation |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notifications/email` | Send custom email |
| POST | `/notifications/order-confirmation` | Send order confirmation |
| POST | `/notifications/shipping` | Send shipping notification |

## Request/Response Examples

### Send Custom Email
```json
POST /notifications/email
{
  "to": "customer@example.com",
  "subject": "Important Update",
  "body": "Your order has been updated..."
}

Response:
{
  "status": "SUCCESS",
  "message": "Email sent successfully"
}
```

### Send Order Confirmation
```json
POST /notifications/order-confirmation
{
  "email": "customer@example.com",
  "orderId": "ORD123456"
}

Response:
{
  "status": "SUCCESS",
  "message": "Email sent successfully"
}
```

### Send Shipping Notification
```json
POST /notifications/shipping
{
  "email": "customer@example.com",
  "orderId": "ORD123456",
  "trackingId": "TRK789012"
}

Response:
{
  "status": "SUCCESS",
  "message": "Email sent successfully"
}
```

## Email Templates

### Order Confirmation
```
Subject: Order Confirmation - {orderId}

Thank you for your order!

Your order #{orderId} has been confirmed.
We will notify you when your order is shipped.
```

### Shipping Notification
```
Subject: Your Order Has Been Shipped - {orderId}

Great news! Your order #{orderId} has been shipped.

Tracking ID: {trackingId}
You can track your package using the tracking ID.
```

## Dependencies
- Spring Boot Web
- Spring Boot Mail
- Spring Cloud Netflix Eureka Client
- Lombok

## Configuration
```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

## Running the Service
```bash
mvn spring-boot:run
```

## Setup Requirements
1. Configure SMTP settings in `application.yml`
2. For Gmail, enable "App Passwords" in Google Account
3. Use App Password instead of regular password

## Future Enhancements
- SMS notifications
- Push notifications
- In-app notifications
- Email templates with Thymeleaf
- Notification preferences
- Unsubscribe management
