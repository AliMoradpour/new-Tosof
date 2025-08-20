# Tosof Backend Project

This is the backend for the Tosof website, built using **NestJS** and **Node.js**. It provides a robust and scalable API for user authentication, content management (blogs, courses), and e-commerce functionality (products, tools).

## Technologies Used

- **Backend Framework:** NestJS (Node.js)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Access & Refresh Tokens)
- **File Uploads:** Multer

## Prerequisites

To run this project, you need to have the following installed on your system:

- **Node.js & NPM:** [Download from nodejs.org](https://nodejs.org/)
- **PostgreSQL:** [Download from postgresql.org](https://www.postgresql.org/download/)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd tosof
```
### 2. Configure the Backend
Navigate to the backend directory and install dependencies:

```Bash

cd backend
npm install
```
### 3. Configure the database
```bash
Open the .env file in the backend directory and configure your database connection string and JWT secret keys.

.env file example:

Code snippet

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/tosof-db?schema=public"
JWT_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
```

### 4. Run database migrations
This will create all the necessary tables in your database.

```Bash

npx prisma migrate dev
```

### 5. Start the server
```Bash

npm run start:dev
```
## The backend server will be running on http://localhost:3000.

### API Endpoints
All endpoints are prefixed with http://localhost:3000.

## Auth Endpoints
Method	Path	Description	Access
POST	/auth/register	Register a new user	Public
POST	/auth/login	Log in and receive JWT tokens	Public
POST	/auth/refresh	Refresh an expired access token	Public

## User Endpoints
Method	Path	Description	Access
GET	/users	Get a list of all users	Admin
PUT	/users/:id/role	Update a user's role	Admin
DELETE	/users/:id	Delete a user	Admin

## Courses Endpoints
Method	Path	Description	Access
GET	/courses	Get all courses	Public
GET	/courses/:id	Get a single course by ID	Public
POST	/courses	Create a new course (with image upload)	Admin
PUT	/courses/:id	Update a course (with optional image)	Admin
DELETE	/courses/:id	Delete a course	Admin

## Blog Endpoints
Method	Path	Description	Access
GET	/blog	Get all blog posts	Public
GET	/blog/:id	Get a single blog post by ID	Public
POST	/blog	Create a new blog post (with image upload)	Admin
PUT	/blog/:id	Update a blog post (with optional image)	Admin
DELETE	/blog/:id	Delete a blog post	Admin

## Products Endpoints
Method	Path	Description	Access
GET	/products	Get all products	Public
GET	/products/:id	Get a single product by ID	Public
POST	/products	Create a new product	Admin
PUT	/products/:id	Update a product	Admin
DELETE	/products/:id	Delete a product	Admin

## Tools Endpoints
Method	Path	Description	Access
GET	/tools	Get all tools	Public
GET	/tools/:id	Get a single tool by ID	Public
POST	/tools	Create a new tool	Admin
PUT	/tools/:id	Update a tool	Admin
DELETE	/tools/:id	Delete a tool	Admin

## Categories Endpoints
Method	Path	Description	Access
GET	/categories	Get all categories	Public
GET	/categories/:id	Get a single category by ID	Public
POST	/categories	Create a new category	Admin
PUT	/categories/:id	Update a category	Admin
DELETE	/categories/:id	Delete a category	Admin
