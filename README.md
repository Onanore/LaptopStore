# Laptop Store

A full-stack web application that simulates an online laptop store. This project demonstrates the integration of Node.js, Express, and MongoDB on the backend with a responsive frontend built using HTML, Bootstrap, and jQuery.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
  - [Laptops Collection](#laptops-collection)
  - [Users Collection](#users-collection)
  - [Orders Collection](#orders-collection)
- [Usage](#usage)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **CRUD Operations:** Create, Read, Update, and Delete functionalities for laptops, orders, and users.
- **User Authentication:** Secure user login and registration using JWT tokens.
- **Role-Based Authorization:** Admins have additional privileges to manage laptop inventory.
- **Responsive Frontend:** A user-friendly interface for both general users and administrators.
- **Optimized Database:** MongoDB collections with proper indexing and query optimization.

## Project Structure
project/ │ app.js │ package.json │ README.md │ ├───models │ Laptop.js │ Order.js │ User.js │ ├───routes │ auth.js │ laptops.js │ orders.js │ users.js │ └───middleware auth.js

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm (comes bundled with Node.js)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd laptop-store
2.	Install dependencies:
3.	npm install
4.	Configure Environment Variables: Create a .env file in the root directory and add:
5.	PORT=3000
6.	MONGODB_URI=mongodb://localhost:27017/laptopstore
7.	JWT_SECRET=yourSecretKey
Note: Replace yourSecretKey with a strong secret key for signing JWT tokens.
8.	Run the application:
9.	npm start
The server will start on http://localhost:3000.
Database Schema
The application uses MongoDB with three main collections: Laptops, Users, and Orders.
Laptops Collection
•	Purpose: Stores details about each laptop.
•	Schema: 
•	const laptopSchema = new mongoose.Schema({
•	  brand: { type: String, required: true, index: true },
•	  model: { type: String, required: true, index: true },
•	  price: { type: Number, required: true },
•	  specifications: {
•	    processor: String,
•	    ram: String,
•	    storage: String,
•	    graphics: String,
•	    display: String
•	  },
•	  available: { type: Boolean, default: true },
•	  createdAt: { type: Date, default: Date.now }
•	});
•	Key Points: 
o	Indexes: brand and model fields are indexed for faster querying.
o	Embedded Document: specifications is embedded to store detailed laptop specs.
Users Collection
•	Purpose: Stores user information including credentials and roles.
•	Schema: 
•	const userSchema = new mongoose.Schema({
•	  username: { type: String, required: true, unique: true, index: true },
•	  email: { type: String, required: true, unique: true, index: true },
•	  password: { type: String, required: true },
•	  role: { type: String, enum: ['user', 'admin'], default: 'user' },
•	  addresses: [{
•	    street: String,
•	    city: String,
•	    state: String,
•	    zip: String,
•	  }]
•	});
•	Key Points: 
o	Unique Constraints: Both username and email must be unique.
o	Embedded Documents: User addresses are stored as nested documents.
Orders Collection
•	Purpose: Manages user orders and maintains relationships with both Users and Laptops.
•	Schema: 
•	const orderSchema = new mongoose.Schema({
•	  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
•	  laptops: [{
•	    laptop: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
•	    quantity: { type: Number, default: 1 }
•	  }],
•	  totalPrice: { type: Number },
•	  orderDate: { type: Date, default: Date.now },
•	  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
•	});
•	Key Points: 
o	Relationships: 
	The user field references the Users collection.
	The laptops array references the Laptops collection.
o	Pre-Save Hook: The schema includes a pre-save hook to calculate totalPrice based on laptop prices and quantities.
Usage
•	API Endpoints: 
o	Authentication: /api/auth for user registration and login.
o	Laptops: /api/laptops for managing laptop data.
o	Orders: /api/orders for order operations.
o	Users: /api/users for fetching and updating user profiles.
•	Frontend Interaction: 
o	The frontend (located in the public directory or served via static files) uses AJAX to interact with the backend APIs.
o	Admin users have access to additional endpoints for managing laptop inventory.
Security
•	Authentication: JWT-based authentication to secure API endpoints.
•	Authorization: Role-based middleware restricts access to admin-only routes.
•	Password Protection: User passwords are hashed using bcrypt before storage.
Future Enhancements
•	Frontend Framework: Migrate to a modern framework (React, Angular, or Vue) for enhanced user experience.
•	Payment Integration: Incorporate a payment gateway for real transactions.
•	Real-Time Features: Implement real-time notifications for order status updates.
•	Performance Improvements: Explore caching and load balancing strategies for scalability.
License
This project is licensed under the MIT License.

