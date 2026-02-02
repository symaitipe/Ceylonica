# User Service

## Overview
The User Service manages user profiles and account information for the Ceylonica platform. It handles user data operations including profile management, address management, and user queries.

## Port
- **8082**

## Features

### 👤 User Profile Management
- View user profile details
- Update user information
- Manage user addresses

### 📍 Address Management
- Store shipping addresses
- Update address information
- Support multiple addresses per user

### 🔍 User Queries
- Get user by ID
- Get user by email
- List all users (admin)

### 📊 User Data Operations
- CRUD operations for user data
- Soft delete support
- Timestamp tracking (created/updated)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/{email}` | Get user profile details |
| POST | `/api/users/profile` | Update user profile |

## Data Model

### User
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": {
    "street": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Boot Validation
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_users`
- **Collection**: `users`

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Notes
- User creation happens through Auth Service during registration
- This service focuses on profile management post-registration
- Integrates with Order Service for shipping address validation
