# Architecture Diagram

## Ceylonica Microservices Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                      CLIENTS                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                                      │
│  │   Browser   │  │  Mobile App │  │  Admin Panel│                                      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                                      │
└─────────┼────────────────┼────────────────┼─────────────────────────────────────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React.js)                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Components: Navbar, Footer, ProductCard, Loader                                 │   │
│  │  Pages: Home, Login, Register, ProductDetails, Cart, Checkout, Orders, Admin     │   │
│  │  Context: AuthContext, CartContext                                               │   │
│  │  API: authApi, productApi, orderApi, cartApi                                     │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────┬────────────────────────────────────────────────┘
                                         │
                                         │ HTTP/REST
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY (Spring Cloud Gateway)                             │
│                                    Port: 8080                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  • Route Management          • Load Balancing         • Rate Limiting           │   │
│  │  • Request Filtering         • Authentication         • CORS Handling           │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────┬────────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
                    ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                          SERVICE REGISTRY (Eureka Server)                                │
│                                    Port: 8761                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  • Service Discovery          • Health Monitoring      • Load Balancing Info    │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────┬────────────────────────────────────────────────┘
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 │                       │                       │
┌────────────────┴────────────────┐     │     ┌─────────────────┴─────────────────┐
│                                 │     │     │                                    │
│  ┌───────────────────────────┐  │     │     │  ┌────────────────────────────┐   │
│  │      AUTH SERVICE         │  │     │     │  │      USER SERVICE          │   │
│  │        Port: 8081         │  │     │     │  │        Port: 8082          │   │
│  │  • Login/Register         │  │     │     │  │  • User Profile            │   │
│  │  • JWT Token Management   │  │     │     │  │  • Address Management      │   │
│  │  • Password Encryption    │  │     │     │  │  • User CRUD               │   │
│  └───────────────────────────┘  │     │     │  └────────────────────────────┘   │
│                                 │     │     │                                    │
│  ┌───────────────────────────┐  │     │     │  ┌────────────────────────────┐   │
│  │    PRODUCT SERVICE        │  │     │     │  │      CART SERVICE          │   │
│  │        Port: 8083         │  │     │     │  │        Port: 8084          │   │
│  │  • Product Catalog        │  │     │     │  │  • Add/Remove Items        │   │
│  │  • Category Management    │  │     │     │  │  • Update Quantities       │   │
│  │  • Inventory Tracking     │  │     │     │  │  • Cart Persistence        │   │
│  └───────────────────────────┘  │     │     │  └────────────────────────────┘   │
│                                 │     │     │                                    │
│  ┌───────────────────────────┐  │     │     │  ┌────────────────────────────┐   │
│  │     ORDER SERVICE         │  │     │     │  │    PAYMENT SERVICE         │   │
│  │        Port: 8085         │  │     │     │  │        Port: 8086          │   │
│  │  • Order Creation         │  │     │     │  │  • Payment Processing      │   │
│  │  • Order Tracking         │  │     │     │  │  • Refund Management       │   │
│  │  • Status Management      │  │     │     │  │  • Transaction Records     │   │
│  └───────────────────────────┘  │     │     │  └────────────────────────────┘   │
│                                 │     │     │                                    │
│  ┌───────────────────────────┐  │     │     │  ┌────────────────────────────┐   │
│  │    DELIVERY SERVICE       │  │     │     │  │    REVIEW SERVICE          │   │
│  │        Port: 8087         │  │     │     │  │        Port: 8088          │   │
│  │  • PickMe Integration     │  │     │     │  │  • Product Reviews         │   │
│  │  • Koombiyo Integration   │  │     │     │  │  • Rating Calculation      │   │
│  │  • Tracking Updates       │  │     │     │  │  • Review Management       │   │
│  └───────────────────────────┘  │     │     │  └────────────────────────────┘   │
│                                 │     │     │                                    │
│  ┌───────────────────────────┐  │     │     │                                    │
│  │  NOTIFICATION SERVICE     │  │     │     │                                    │
│  │        Port: 8089         │  │     │     │                                    │
│  │  • Email Notifications    │  │     │     │                                    │
│  │  • Order Confirmations    │  │     │     │                                    │
│  │  • Shipping Updates       │  │     │     │                                    │
│  └───────────────────────────┘  │     │     │                                    │
│                                 │     │     │                                    │
└─────────────────────────────────┘     │     └────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE LAYER (MongoDB)                                    │
│                                    Port: 27017                                           │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │
│  │  users-db     │ │ products-db   │ │  orders-db    │ │   cart-db     │               │
│  │  • Users      │ │ • Products    │ │  • Orders     │ │   • Carts     │               │
│  │  • Auth       │ │ • Categories  │ │  • OrderItems │ │   • CartItems │               │
│  └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘               │
└─────────────────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL INTEGRATIONS                                       │
│  ┌───────────────────────────┐       ┌───────────────────────────┐                      │
│  │    PickMe Delivery API    │       │   Koombiyo Delivery API   │                      │
│  └───────────────────────────┘       └───────────────────────────┘                      │
│  ┌───────────────────────────┐       ┌───────────────────────────┐                      │
│  │    SMTP Email Service     │       │   Payment Gateway (TBD)   │                      │
│  └───────────────────────────┘       └───────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────────────────────────┘


                              DATA FLOW DIAGRAM
                              ─────────────────

    User Request → API Gateway → Service Registry (Lookup) → Target Service → MongoDB
                                                                    │
                                                                    ▼
    User Response ← API Gateway ← Target Service Response ← Business Logic


                              SERVICE COMMUNICATION
                              ─────────────────────

    ┌──────────────┐     REST      ┌──────────────┐     REST      ┌──────────────┐
    │   Frontend   │ ──────────▶   │  API Gateway │ ──────────▶   │   Services   │
    └──────────────┘               └──────────────┘               └──────────────┘
                                          │
                                          │ Service Discovery
                                          ▼
                                   ┌──────────────┐
                                   │    Eureka    │
                                   └──────────────┘


                              DEPLOYMENT ARCHITECTURE
                              ──────────────────────

    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                           Docker Host                                        │
    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
    │  │Frontend │ │ Gateway │ │ Eureka  │ │  Auth   │ │ Product │ │  Order  │   │
    │  │Container│ │Container│ │Container│ │Container│ │Container│ │Container│   │
    │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
    │  │  Cart   │ │ Payment │ │Delivery │ │ Review  │ │  Notif  │ │ MongoDB │   │
    │  │Container│ │Container│ │Container│ │Container│ │Container│ │Container│   │
    │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
    └─────────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Axios, React Router |
| API Gateway | Spring Cloud Gateway |
| Service Discovery | Netflix Eureka |
| Backend Services | Spring Boot 3.2, Java 17 |
| Database | MongoDB 7.0 |
| Authentication | JWT (JSON Web Tokens) |
| Containerization | Docker, Docker Compose |
| Web Server | Nginx |
