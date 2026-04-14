# MERN eCommerce Application

This repository contains a complete MERN stack eCommerce web application with:

- React + Vite frontend
- Redux Toolkit state management
- Express + Node.js backend
- MongoDB + Mongoose models
- JWT authentication
- Stripe test payments
- Cloudinary image uploads
- Admin product, user, and order management

## Folder Structure

```text
.
|-- backend
|   |-- config
|   |   `-- db.js
|   |-- controllers
|   |   |-- authController.js
|   |   |-- orderController.js
|   |   |-- paymentController.js
|   |   |-- productController.js
|   |   |-- uploadController.js
|   |   `-- userController.js
|   |-- data
|   |   |-- products.js
|   |   |-- seed.js
|   |   `-- users.js
|   |-- middleware
|   |   |-- authMiddleware.js
|   |   `-- errorMiddleware.js
|   |-- models
|   |   |-- Order.js
|   |   |-- Product.js
|   |   `-- User.js
|   |-- routes
|   |   |-- authRoutes.js
|   |   |-- orderRoutes.js
|   |   |-- paymentRoutes.js
|   |   |-- productRoutes.js
|   |   |-- uploadRoutes.js
|   |   `-- userRoutes.js
|   |-- utils
|   |   |-- cloudinary.js
|   |   `-- generateToken.js
|   |-- .env.example
|   |-- package.json
|   |-- server.js
|   `-- srcApp.js
|-- frontend
|   |-- public
|   |-- src
|   |   |-- api
|   |   |   `-- axios.js
|   |   |-- app
|   |   |   `-- store.js
|   |   |-- components
|   |   |   |-- admin
|   |   |   |   `-- ProductFormModal.jsx
|   |   |   |-- layout
|   |   |   |   |-- Footer.jsx
|   |   |   |   |-- Header.jsx
|   |   |   |   |-- Layout.jsx
|   |   |   |   `-- ProtectedRoute.jsx
|   |   |   |-- CartItem.jsx
|   |   |   |-- CheckoutForm.jsx
|   |   |   |-- Loader.jsx
|   |   |   |-- Message.jsx
|   |   |   |-- Pagination.jsx
|   |   |   |-- ProductCard.jsx
|   |   |   `-- SearchFilters.jsx
|   |   |-- features
|   |   |   |-- auth
|   |   |   |   `-- authSlice.js
|   |   |   |-- cart
|   |   |   |   `-- cartSlice.js
|   |   |   |-- order
|   |   |   |   `-- orderSlice.js
|   |   |   `-- product
|   |   |       `-- productSlice.js
|   |   |-- pages
|   |   |   |-- AdminDashboardPage.jsx
|   |   |   |-- CartPage.jsx
|   |   |   |-- CheckoutPage.jsx
|   |   |   |-- HomePage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   |-- NotFoundPage.jsx
|   |   |   |-- ProductDetailsPage.jsx
|   |   |   |-- ProductListPage.jsx
|   |   |   |-- ProfilePage.jsx
|   |   |   `-- RegisterPage.jsx
|   |   |-- utils
|   |   |   `-- format.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
|-- .gitignore
`-- README.md
```

## Backend Code

Backend entry point:

- `backend/server.js` boots the API server and MongoDB connection.
- `backend/srcApp.js` configures middleware, routes, health checks, and API docs.

Core backend modules:

- `backend/models/User.js` defines users with hashed passwords and `role`.
- `backend/models/Product.js` defines catalog products with price, stock, category, and featured flags.
- `backend/models/Order.js` stores order items, shipping, Stripe payment result, and delivery state.
- `backend/controllers/*.js` implement auth, products, orders, uploads, payments, and admin flows.
- `backend/routes/*.js` expose REST endpoints under `/api`.
- `backend/middleware/authMiddleware.js` protects private/admin routes with JWT verification.
- `backend/data/seed.js` seeds demo users and products.

API highlights:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `GET /api/products`
- `GET /api/products/featured`
- `GET /api/products/:id`
- `POST /api/products` admin only
- `PUT /api/products/:id` admin only
- `DELETE /api/products/:id` admin only
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/orders/:id`
- `GET /api/orders/admin/all` admin only
- `PUT /api/orders/:id` admin only
- `GET /api/users` admin only
- `POST /api/payments/create-intent`
- `POST /api/uploads` admin only

## Frontend Code

Frontend entry point:

- `frontend/src/main.jsx` mounts the app with Redux Provider and React Router.
- `frontend/src/App.jsx` defines application routes and protected pages.

Core frontend modules:

- `frontend/src/app/store.js` sets up Redux Toolkit store.
- `frontend/src/features/auth/authSlice.js` handles register, login, profile, logout, and admin user fetch.
- `frontend/src/features/product/productSlice.js` handles product listing, details, admin CRUD, and Cloudinary uploads.
- `frontend/src/features/cart/cartSlice.js` persists cart and shipping info in local storage.
- `frontend/src/features/order/orderSlice.js` handles Stripe client secret creation and order management.
- `frontend/src/pages/*.jsx` provide the full storefront, checkout, profile, and admin interface.
- `frontend/src/components/*.jsx` contains reusable UI for cards, filters, pagination, forms, and layout.

Implemented pages:

- Home
- Product List
- Product Details
- Cart
- Checkout
- Login
- Register
- User Profile
- Admin Dashboard
- 404 page


### Everything is already inside this one project folder:

- `backend` for the API
- `frontend` for the React app
- root `package.json` for running both together

Run from the root folder:

```bash
npm install
npm run dev
```

Useful root scripts:

- `npm run dev`
- `npm run dev:backend`
- `npm run dev:frontend`
- `npm run seed`
- `npm run seed:destroy`

## Setup Guide

### 1. Prerequisites

Install the following first:

- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection string
- Stripe test account
- Cloudinary account

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Update `backend/.env` with real values:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `STRIPE_SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Install dependencies:

```bash
npm install
```

Seed sample data:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

Sample credentials after seeding:

- Admin: `admin@example.com` / `Admin123!`
- User: `john@example.com` / `User123!`

### 3. Configure the frontend

```bash
cd frontend
cp .env.example .env
```

Update `frontend/.env`:

- `VITE_API_URL=http://localhost:5000/api`
- `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

### 4. Run the app locally

Run both services from the root folder:

```bash
npm run dev
```

Or run them separately:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

Health and docs endpoints:

- `GET http://localhost:5000/api/health`
- `GET http://localhost:5000/api/docs`

### 5. Stripe test cards

Use Stripe test card:

- Card number: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any postal code

## Deployment Guide

### Option A: Vercel + Render

Frontend on Vercel:

1. Push the repository to GitHub.
2. Import the `frontend` folder into Vercel.
3. Set environment variables:
   - `VITE_API_URL=https://your-render-api-url/api`
   - `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`
4. Use build command `npm run build`.
5. Use output directory `dist`.

Backend on Render:

1. Create a new Web Service from the same GitHub repo.
2. Set root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `backend/.env.example`.
6. Update `CLIENT_URL` to the deployed Vercel domain.
7. Add MongoDB Atlas connection string to `MONGO_URI`.

### Option B: AWS

Frontend:

1. Build the frontend with `npm run build`.
2. Upload `frontend/dist` to an S3 bucket.
3. Serve via CloudFront.
4. Set `VITE_API_URL` to your EC2, ECS, or Elastic Beanstalk API URL before building.

Backend:

1. Deploy the backend to EC2, ECS, or Elastic Beanstalk.
2. Set environment variables on the host.
3. Use MongoDB Atlas for production database hosting.
4. Put the API behind Nginx or an AWS load balancer.
5. Restrict CORS `CLIENT_URL` to the production frontend domain.

## Production Notes

- Store secrets only in environment variables.
- Use HTTPS in production for Stripe and JWT security.
- Replace demo seed users for production deployments.
- Add Stripe webhook handling if you want asynchronous payment reconciliation.
- Add image optimization and CDN caching for large catalogs.
