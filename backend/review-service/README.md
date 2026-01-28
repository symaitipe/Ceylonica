# Review Service

## Overview
The Review Service manages product reviews and ratings for the Ceylonica platform. It allows customers to share their feedback and helps other buyers make informed purchase decisions.

## Port
- **8088**

## Features

### ⭐ Product Reviews
- Submit product reviews
- Rate products (1-5 stars)
- Add review comments
- View all reviews for a product

### 📊 Rating Analytics
- Calculate average ratings
- Count total reviews
- Rating distribution
- Product rating summary

### 👤 User Reviews
- Track reviews by user
- One review per product per user
- Edit/delete own reviews

### 🔍 Review Display
- Sort reviews by date
- Filter by rating
- Helpful vote tracking (future)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reviews` | Submit a new review |
| GET | `/reviews/product/{productId}` | Get all reviews for a product |
| GET | `/reviews/product/{productId}/summary` | Get rating summary |

## Request/Response Examples

### Submit Review
```json
POST /reviews
Headers: X-User-Id: user123

{
  "productId": "prod123",
  "rating": 5,
  "comment": "Excellent quality Ceylon tea! Highly recommended."
}

Response:
{
  "id": "rev123",
  "productId": "prod123",
  "userId": "user123",
  "rating": 5,
  "comment": "Excellent quality Ceylon tea! Highly recommended.",
  "createdAt": "2026-01-28T10:30:00"
}
```

### Get Product Reviews
```json
GET /reviews/product/prod123

Response:
[
  {
    "id": "rev123",
    "productId": "prod123",
    "userId": "user123",
    "rating": 5,
    "comment": "Excellent quality!",
    "createdAt": "2026-01-28T10:30:00"
  },
  {
    "id": "rev124",
    "productId": "prod123",
    "userId": "user456",
    "rating": 4,
    "comment": "Good product, fast delivery",
    "createdAt": "2026-01-27T14:20:00"
  }
]
```

### Get Rating Summary
```json
GET /reviews/product/prod123/summary

Response:
{
  "productId": "prod123",
  "averageRating": 4.5,
  "totalReviews": 2
}
```

## Data Model

### Review
```json
{
  "id": "string",
  "productId": "string",
  "userId": "string",
  "rating": 5,
  "comment": "string",
  "createdAt": "datetime"
}
```

## Rating Scale

| Stars | Meaning |
|-------|---------|
| ⭐⭐⭐⭐⭐ (5) | Excellent |
| ⭐⭐⭐⭐ (4) | Good |
| ⭐⭐⭐ (3) | Average |
| ⭐⭐ (2) | Poor |
| ⭐ (1) | Very Poor |

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_reviews`
- **Collection**: `reviews`

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Future Enhancements
- Image attachments for reviews
- Helpful/Not helpful voting
- Verified purchase badge
- Review moderation
- Review response by sellers
