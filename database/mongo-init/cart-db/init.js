// MongoDB initialization script for cart database
db = db.getSiblingDB('ceylonica_cart');

// Create indexes
db.carts.createIndex({ "userId": 1 }, { unique: true });

print("Cart database initialized successfully");
