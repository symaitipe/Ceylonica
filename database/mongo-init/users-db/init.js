// MongoDB initialization script for users database
db = db.getSiblingDB('ceylonica_users');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });

// Insert sample admin user
db.users.insertOne({
    name: "Admin User",
    email: "admin@ceylonica.com",
    phone: "+94771234567",
    address: {
        street: "123 Main Street",
        city: "Colombo",
        postalCode: "00100",
        country: "Sri Lanka"
    },
    createdAt: new Date(),
    updatedAt: new Date()
});

print("Users database initialized successfully");
