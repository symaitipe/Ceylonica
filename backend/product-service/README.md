# Product Service

## Overview
The Product Service manages the product catalog for the Ceylonica e-commerce platform. It handles all product-related operations including listing, searching, categorization, and inventory management.

## Port
- **8083**

## Features

### 📦 Product Catalog
- List all available products
- Get product details by ID
- Rich product information (name, description, price, images)

### 🔍 Search & Filter
- Full-text search on product name and description
- Filter products by category
- Search with pagination support

### 📂 Category Management
- Organize products by categories
- Category-based product listing
- Support for multiple product categories

### 📊 Inventory Management
- Track product stock levels
- In-stock/Out-of-stock status
- Stock quantity updates

### 🛠️ Admin Operations
- Create new products
- Update product information
- Delete products
- Manage product images

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/productlist` | Get all products |
| GET | `/api/product/{productId}` | Get product by ID |
| GET | `/products/search?q={query}` | Search products |
| POST | `/api/addproduct` | Create new product (Admin) |
| PUT | `/api/updateproduct` | Update product (Admin) |
| DELETE | `/api/product/{productId}` | Delete product (Admin) |

## Data Model

### Product
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": 1500.00,
  "stock": 100,
  "category": "string",
  "imageUrl": "string",
  "images": ["string"],
  "inStock": true,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Product Categories
- Tea
- Spices
- Oil
- Clothing
- Food
- Handicrafts
- Gems & Jewelry

## Dependencies
- Spring Boot Web
- Spring Data MongoDB
- Spring Boot Validation
- Spring Cloud Netflix Eureka Client
- Lombok

## Database
- **MongoDB Database**: `ceylonica_products`
- **Collection**: `products`
- **Indexes**: category, text search (name, description)

## Configuration
See `src/main/resources/application.yml` for detailed configuration.

## Running the Service
```bash
mvn spring-boot:run
```

## Sample Products (Pre-loaded)
1. Ceylon Tea - Premium
2. Ceylon Cinnamon
3. Coconut Oil - Virgin
4. Handloom Sarong
5. Cashew Nuts - Roasted
