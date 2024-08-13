# UBook | Back-end + Front-end

Welcome to UBook! This project enables users to create accounts as either Business owners or Consumers, facilitating the offering and booking of services. Below, you'll find detailed information about the project's features, how to get started, and various other details.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Authentication](#authentication)
- [Email Verification](#email-verification)
- [Dockerization](#dockerization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Business Accounts:** Business owners can create and manage their services, set prices, and view booked appointments on a calendar.
- **Consumer Accounts:** Consumers can browse available services, book appointments, rate services, and check the status of their bookings.
- **Booking Management:** Allows seamless booking and management of appointments between businesses and consumers.
- **Rating System:** Consumers can rate the services they have used.
- **Email Verification:** New users receive account verification emails powered by Nodemailer.

## Technology Stack

### Front-end

- **React:** A JavaScript library for building user interfaces.
- **Redux:** State management for handling global state across the application.
- **MUI (Material-UI):** A library for styling and pre-built components that follow Material Design guidelines.

### Back-end

- **Express:** A Node.js web application framework for building the back-end.
- **JWT:** JSON Web Tokens for secure user authentication.
- **MySQL2:** A Node.js MySQL client for interacting with the MySQL database.
- **Nodemailer:** A Node.js module for sending emails (used for account verification).
- **Pug:** A template engine for rendering dynamic email content.

### Dockerization

- **Docker:** The entire application, including the front-end, back-end, and database, is containerized for easy deployment and consistent environment setup.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later) or **yarn** (v1.x or later)
- **Docker** and **Docker Compose** for containerization

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AtroxEGO/ubook.git
   cd ubook
   ```

2. **Install dependencies for both front-end and back-end:**

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Application

#### Without Docker

1. **Set up environment variables:**

   Create a `.env` file in the `server` directory and configure the necessary environment variables:

   ```plaintext
   DB_PASSWORD=your_db_password
   MAIL_USER=email@example.com
   MAIL_PASSWORD=your_email_password
   JWT_PRIVATE_KEY=your_jwt_private_key
   ```

   Create a `.env` file in the `client` directory and configure the necessary environment variables:

   ```plaintext
   REACT_APP_API_HOST = "http://localhost:3002/api"
   ```

2. **Start the MySQL database:**

   Ensure your MySQL server is running and that the database specified in the `.env` file is created.

3. **Start the back-end:**

   ```bash
   cd server
   npm run start
   ```

4. **Start the front-end:**

   ```bash
   cd client
   npm start
   ```

   The front-end will be available at `http://localhost:3000` and the back-end at `http://localhost:3002`.

#### With Docker

1. **Build and start the Docker containers:**

   ```bash
   docker compose up --build
   ```

   This will start both the front-end and back-end services along with a MySQL database. The front-end will be available at `http://localhost:3000` and the back-end at `http://localhost:3002`.

## Authentication

Authentication is managed using JSON Web Tokens (JWT). Users can log in with an email and password, and each session is secured with a JWT that must be included in the authorization header for protected routes.

## Email Verification

Nodemailer is used to send verification emails to new users. Email templates are rendered using Pug, which allows for dynamic content in the emails.

## Dockerization

The application is fully containerized using Docker, with the following services defined in the `compose.yml` file:

- **frontend:** Runs the React application.
- **backend:** Runs the Express server.
- **database:** Runs the MySQL database.

### Docker Commands

- **Build and start containers:**

  ```bash
  docker compose up --build
  ```

- **Stop containers:**

  ```bash
  docker compose down
  ```

- **Rebuild without cache:**

  ```bash
  docker compose build --no-cache
  ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
