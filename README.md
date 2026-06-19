Dealership Website

A full-stack MERN dealership application where users can browse vehicles, create accounts, securely authenticate, purchase bikes through Stripe Checkout, and 
administrators can manage inventorythrough an admin dashboard.

Features

User Features

- User registration and login
- JWT authentication with refresh tokens
- Secure HTTP-only cookie authentication
- Browse available bikes
- View detailed bike information
- Purchase bikes using Stripe Checkout
- View purchase status after successful payment

Admin Features

- Add new bikes
- Remove bikes
- Manage dealership inventory
- Protected admin-only routes

Tech Stack

Frontend

- React
- React Router
- Axios
- Vite

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- Redis (Rate Limiting)
- Stripe Checkout
- Stripe Webhooks

Security Features

- Password hashing with bcrypt
- JWT access tokens
- Refresh token authentication
- HTTP-only cookies
- Request validation using Zod
- Redis-based login rate limiting
- Protected API routes
- Server-side payment verification using Stripe Webhooks

Project Structure

Backend
│
├── controller/
├── middleware/
├── model/
├── routes/
├── server/
└── index.cjs

Frontend
│
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Context/
│   └── App.jsx

Installation

Clone the repository

git clone https://github.com/Hussnain-Sohail/Dealership-site.git

Install backend dependencies

cd Backend
npm install

Install frontend dependencies

cd frontend
npm install

Environment Variables

Create a ".env" file for the backend.

Example:

PORT=
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=
REDIS_URL=

Running the Project

Backend

npm start

Frontend

npm run dev

Payment Flow

1. User selects a bike.
2. Backend creates a Stripe Checkout Session.
3. User completes payment on Stripe.
4. Stripe sends a webhook to the backend.
5. The webhook verifies the payment and updates the order.
6. The user is redirected back to the application.

Future Improvements

- Order history page
- Image uploads with Cloudinary
- Search and filtering
- Pagination
- Wishlist functionality
- Unit and integration tests
- Docker support
- CI/CD pipeline

Learning Objectives

This project was built to practice:

- Full-stack MERN development
- Authentication and authorization
- REST API development
- MongoDB data modeling
- Payment gateway integration
- Secure backend practices
- Input validation
- Rate limiting
- Working with third-party APIs

License

This project is for educational and portfolio purposes.
