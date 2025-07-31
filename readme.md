# 🚲 Bike Shop Server

A robust, scalable REST API backend for a bike shop e-commerce platform built with Node.js, Express, TypeScript, and MongoDB. This server provides comprehensive functionality for bike management, user authentication, order processing, and payment integration.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Payment Integration](#-payment-integration)
- [Error Handling](#-error-handling)
- [Deployment](#-deployment)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with refresh tokens
- **👥 Role-based Access Control**: Admin and customer roles with different permissions
- **🚴 Bike Management**: CRUD operations for bike products with categories
- **🛒 Order Processing**: Complete order lifecycle management
- **💳 Payment Integration**: ShurjoPay payment gateway integration
- **📊 Revenue Tracking**: Admin dashboard for revenue analytics
- **🔒 Security**: Password hashing, input validation, and error handling
- **📱 CORS Support**: Configured for frontend integration
- **🚀 Production Ready**: Optimized for deployment on Vercel

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod schema validation
- **Payment**: ShurjoPay integration

### Development Tools
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Development Server**: ts-node-dev
- **Type Checking**: TypeScript

### Deployment
- **Platform**: Vercel
- **Environment**: Production-ready configuration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bike-shop-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration (see [Environment Variables](#-environment-variables) section).

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:27017/bike-shop

# Authentication
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Default Admin
DEFAULT_PASS=admin123
SUPER_ADMIN_PASSWORD=super_admin_password

# Payment Gateway (ShurjoPay)
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=your_username
SP_PASSWORD=your_password
SP_PREFIX=your_prefix
SP_RETURN_URL=your_return_url

# Optional: Cloudinary (for image uploads)
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_NAME=your_cloudinary_name
```

## 🎯 Usage

### Available Scripts

```bash
# Development
npm run start:dev          # Start development server with hot reload
npm run build             # Build TypeScript to JavaScript
npm run start:prod        # Start production server

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint errors
npm run format            # Format code with Prettier

# Testing
npm test                  # Run tests
```

### Server Endpoints

The server runs on `http://localhost:5000` by default and provides the following base endpoints:

- **Health Check**: `GET /`
- **API Base**: `GET /api/v1`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/login` | User login | No |
| POST | `/api/v1/auth/change-password` | Change password | Yes |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users` | Get all users | Admin |
| POST | `/api/v1/users` | Create user | Admin |
| GET | `/api/v1/users/:id` | Get user by ID | Admin |
| PATCH | `/api/v1/users/:id` | Update user | Admin |
| DELETE | `/api/v1/users/:id` | Delete user | Admin |

### Bike Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/products/bikes` | Get all bikes | No |
| GET | `/api/v1/products/:productId` | Get single bike | No |
| POST | `/api/v1/products/create-bike` | Create bike | Admin |
| PATCH | `/api/v1/products/:productId` | Update bike | Admin |
| DELETE | `/api/v1/products/:productId` | Delete bike | Admin |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/orders/create-order` | Create order | Customer |
| GET | `/api/v1/orders/allOrders` | Get orders | Customer/Admin |
| GET | `/api/v1/orders/:orderId` | Get single order | Admin |
| PATCH | `/api/v1/orders/:orderId` | Update order | Admin/Customer |
| DELETE | `/api/v1/orders/:orderId` | Delete order | Admin |
| GET | `/api/v1/orders/verify` | Verify payment | Customer |

### Admin Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/admin` | Admin dashboard | Admin |

## 🗄 Database Schema

### User Model
```typescript
{
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  phone?: string;
  img?: string;
  country?: string;
  city?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
}
```

### Bike Model
```typescript
{
  name: string;
  brand: string;
  model: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Folding' | 'Electric';
  photoURL: string;
  description: string;
  quantity: number;
  inStock: boolean;
}
```

### Order Model
```typescript
{
  user: any;
  products: [{
    product: ObjectId;
    quantity: number;
    category: string;
    price: number;
    photoURL: string;
    productName: string;
  }];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Short-lived token for API access
- **Refresh Token**: Long-lived token for getting new access tokens
- **Role-based Access**: Different permissions for admin and customer roles

### Authentication Flow

1. **Login**: POST `/api/v1/auth/login`
   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. **Protected Routes**: Include `Authorization: Bearer <token>` header

3. **Refresh Token**: POST `/api/v1/auth/refresh-token` when access token expires

## 💳 Payment Integration

The application integrates with **ShurjoPay** payment gateway for processing payments:

- **Sandbox Mode**: Available for testing
- **Production Mode**: Live payment processing
- **Payment Verification**: Automatic verification of payment status
- **Transaction Tracking**: Complete transaction history

## ⚠️ Error Handling

The application implements comprehensive error handling:

- **Global Error Handler**: Centralized error processing
- **Validation Errors**: Zod schema validation
- **Database Errors**: Mongoose error handling
- **Authentication Errors**: JWT validation errors
- **Custom Error Classes**: Structured error responses

## 🚀 Deployment

### Vercel Deployment

The project is configured for deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Set all required environment variables in Vercel dashboard
3. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start:prod
   ```

## 🛠 Development

### Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── errors/          # Error handling
│   ├── interface/       # TypeScript interfaces
│   ├── middleware/      # Express middleware
│   ├── modules/         # Feature modules
│   │   ├── Admin/       # Admin functionality
│   │   ├── Auth/        # Authentication
│   │   ├── bike/        # Bike management
│   │   ├── order/       # Order processing
│   │   ├── revenue/     # Revenue tracking
│   │   └── user/        # User management
│   ├── routes/          # Route definitions
│   └── utils/           # Utility functions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

### Code Quality

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type safety and IntelliSense
- **Strict Mode**: Enabled for better type checking

### Adding New Features

1. Create a new module in `src/app/modules/`
2. Define interfaces in the module's `interface.ts`
3. Create controller, service, and route files
4. Add validation schemas
5. Register routes in `src/app/routes/index.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add proper error handling
- Include input validation
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using Node.js, Express, TypeScript, and MongoDB**

For support or questions, please open an issue on GitHub.
