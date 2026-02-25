# Ceylonica Frontend

Ceylonica is a modern e-commerce platform built with React and Vite. It follows a **Refined Modular Monolithic Architecture** to ensure scalability and maintainability.

## Project Architecture

The project is organized into two main logical sections:

### 1. `src/core/`
This directory contains the shared infrastructure used across all modules.
- **`src/core/api/`**: Contains the shared `axios.instance.js` which handles automatic token attachment and 401 redirection.
- **`src/core/components/common/`**: Reusable UI components like `Navbar`, `Footer`, and `Loader`.
- **`src/core/utils/`**: Shared constants and utility functions.

### 2. `src/modules/`
Each feature is isolated within its own module. Every module follows a strict internal structure:
- **`pages/`**: Screen-level components. All page components are suffixed with `Page` (e.g., `LoginPage.jsx`).
- **`components/`**: Reusable modules-specific components.
- **`services/`**: Contains API services (`*.service.js`) and Context Providers (`*.context.jsx`).

## Tech Stack
- **React**: UI library.
- **Vite**: Modern build tool and dev server.
- **Axios**: HTTP client for API communication.
- **React Router**: For navigation.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Contribution Guidelines

To maintain the modular structure, please follow these rules when contributing:

### 1. Adding a New Feature
- Create a new directory in `src/modules/` (e.g., `src/modules/reviews/`).
- Include `pages/`, `components/`, and `services/` subdirectories.
- Name your main screen component with the `Page` suffix.

### 2. File Naming Conventions
- **Pages**: `SomeNamePage.jsx`
- **API Services**: `featureName.service.js`
- **Contexts**: `featureName.context.jsx`
- **JSX Extensions**: Always use `.jsx` if the file contains JSX (strictly enforced by Vite).

### 3. API Communication
- Always import the shared axios instance from `src/core/api/axios.instance.js`.
- This ensures your requests automatically include the authentication token.

### 4. Environment Variables
- New environment variables must be prefixed with `VITE_` (e.g., `VITE_API_URL`).
- Access them using `import.meta.env.VITE_VAR_NAME`.

## Directory Map
```text
src/
├── core/                  # Shared infrastructure
│   ├── api/               # Shared API clients
│   ├── components/common/ # Shared UI elements
│   └── utils/             # Constants & Helpers
└── modules/               # Feature-based folders
    ├── auth/              # Authentication module
    ├── products/          # Product Catalog module
    ├── cart/              # Cart & Checkout module
    ├── orders/            # Order Management module
    └── admin/             # Admin Dashboard module
```
