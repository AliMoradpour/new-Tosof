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
2. Configure the Backend
Navigate to the backend directory and install dependencies:

Bash

cd backend
npm install
3. Configure the database
Open the .env file in the backend directory and configure your database connection string and JWT secret keys.

.env file example:

Code snippet

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/tosof-db?schema=public"
JWT_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

4. Run database migrations
This will create all the necessary tables in your database.

Bash

npx prisma migrate dev
5. Start the server
Bash

npm run start:dev
The backend server will be running on http://localhost:3000.

Project Structure
src/auth: Authentication logic (JWT strategies, guards, etc.).

src/users: Manages user data and business logic.

src/courses, src/blog, src/products, src/tools: Modules for managing the main content.

src/uploads: Handles file upload logic with Multer.

src/prisma: Dedicated module for Prisma service.

prisma/schema.prisma: Defines the database schema and models.

API Documentation
For a complete list of all available endpoints, their request bodies, and responses, please refer to the provided API documentation file.