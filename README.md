# Crypto App - Backend

A full-stack cryptocurrency platform built with Node.js, Express, MongoDB.

## Features

- **Authentication System (JWT-Based)**
  - User registration
  - User login with JWT tokens
  - Protected profile page
  - $10,000 demo balance for trading

- **Crypto Trading**
  - Buy cryptocurrencies
  - Sell cryptocurrencies
  - View holdings
  - Transaction history

- **Crypto Data Management**
  - View all tradable cryptocurrencies
  - View top gainers (sorted by 24h price change)
  - View new listings (sorted by creation date)
  - Add new cryptocurrencies (authenticated)

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

3. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/auth/profile` | Get user profile (protected) |
| POST | `/api/auth/buy` | Buy crypto (protected) |
| POST | `/api/auth/sell` | Sell crypto (protected) |

### Cryptocurrencies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crypto` | Get all cryptocurrencies |
| GET | `/api/crypto/gainers` | Get top gainers |
| GET | `/api/crypto/new` | Get new listings |
| POST | `/api/crypto` | Add new cryptocurrency |

## License

MIT