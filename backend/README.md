# ContactBook Backend

A robust and secure RESTful API for managing personal contacts, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: Secure user registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Contact Management**:
  - Create, Read, Update, and Delete (CRUD) contacts.
  - Form validation using Joi.
  - Each user can only access their own contacts.
- **Security**: CORS enabled, environment variable configuration, and secure password storage.
- **Logging**: Request logging using Morgan.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **Logging**: Morgan

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shubhashita/ContactBook.git
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `config/config.env` file and add the following variables:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## 🚀 Running the App

### Development Mode (with Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will be running on `http://localhost:8000`.

## 🛣️ API Endpoints

### Auth Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive JWT token

### Contact Routes
- `GET /api/mycontacts` - Get all contacts for the authenticated user
- `POST /api/contact` - Create a new contact
- `GET /api/contact/:id` - Get a single contact
- `PUT /api/contact` - Update a contact
- `DELETE /api/contact/:id` - Delete a contact

## 📂 Project Structure

```text
backend/
├── config/             # Database and environment configurations
├── controllers/        # Request handlers
├── middlewares/        # Custom Express middlewares
├── models/             # Mongoose schemas
├── repositories/       # Data access layer
├── routes/             # Route definitions
├── services/           # Business logic layer
├── validators/         # Input validation schemas
├── app.js              # Entry point
└── package.json        # Dependencies and scripts
```

## 📝 License

This project is licensed under the MIT License.
