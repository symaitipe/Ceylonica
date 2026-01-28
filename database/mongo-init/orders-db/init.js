// MongoDB initialization script for orders database
db = db.getSiblingDB('ceylonica_orders');

// Create indexes
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "createdAt": -1 });

print("Orders database initialized successfully");
