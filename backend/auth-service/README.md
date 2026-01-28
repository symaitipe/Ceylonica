# Authentication Service

## Overview
The Auth Service handles all authentication and authorization operations for the Ceylonica platform. It manages user registration, login, and JWT token generation for secure API access.

## Port
- **8081**

## Features

### 🔐 User Authentication
- User registration with email and password
- Secure login with credential validation
- Password encryption using BCrypt

### 🎫 JWT Token Management
- JWT token generation on successful login
- Token validation and verification
- Configurable token expiration (default: 24 hours)

### 👤 User Management
- Create new user accounts
- Role-based user creation (USER, ADMIN)
- Email uniqueness validation

### 🔒 Security Features
- Password hashing with BCrypt
- Stateless authentication
- Secure token signing with HMAC-SHA256

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |
| POST | `/auth/logout` | Logout user |

## Request/Response Examples

### Register
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Dependencies
- Spring Boot Web
- Spring Boot Security
- Spring Data MongoDB
- Spring Cloud Netflix Eureka Client
- JJWT (JSON Web Token)
- Lombok

## Database
- **MongoDB Database**: `ceylonica_auth`
- **Collection**: `users`

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT signing | Configured in application.yml |
| `JWT_EXPIRATION` | Token expiration time (ms) | 86400000 (24 hours) |

## Running the Service
```bash
mvn spring-boot:run
```
