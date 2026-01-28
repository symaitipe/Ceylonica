// MongoDB initialization script for products database
db = db.getSiblingDB('ceylonica_products');

// Create indexes
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "name": "text", "description": "text" });

// Insert sample products
db.products.insertMany([
    {
        name: "Ceylon Tea - Premium",
        description: "Premium quality Ceylon black tea from the highlands",
        price: 1500.00,
        stock: 100,
        category: "Tea",
        imageUrl: "https://example.com/images/ceylon-tea.jpg",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Ceylon Cinnamon",
        description: "Authentic Ceylon cinnamon, the finest in the world",
        price: 2500.00,
        stock: 50,
        category: "Spices",
        imageUrl: "https://example.com/images/cinnamon.jpg",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Coconut Oil - Virgin",
        description: "100% pure virgin coconut oil from Sri Lanka",
        price: 1200.00,
        stock: 75,
        category: "Oil",
        imageUrl: "https://example.com/images/coconut-oil.jpg",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Handloom Sarong",
        description: "Traditional Sri Lankan handloom sarong",
        price: 3500.00,
        stock: 30,
        category: "Clothing",
        imageUrl: "https://example.com/images/sarong.jpg",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Cashew Nuts - Roasted",
        description: "Premium roasted cashew nuts from Sri Lanka",
        price: 1800.00,
        stock: 60,
        category: "Food",
        imageUrl: "https://example.com/images/cashews.jpg",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

print("Products database initialized successfully");
