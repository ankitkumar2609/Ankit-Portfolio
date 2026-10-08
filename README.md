# Ankit Kumar - Full Stack MERN Portfolio Website

Production-ready, responsive, and high-performance **Full-Stack Portfolio Website** built using the **MERN Stack** (MongoDB, Express.js, React 18, Node.js) with **Tailwind CSS**, **Framer Motion**, **JWT Authentication**, and **Nodemailer**.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Key Features](#key-features)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Installation & Setup](#installation--setup)
6. [Database Seeding](#database-seeding)
7. [Running Locally](#running-locally)
8. [Production Build](#production-build)
9. [Deployment Guide](#deployment-guide)
10. [API Documentation](#api-documentation)

---

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Tailwind CSS, Framer Motion, Axios, React Icons, React Hot Toast
- **Backend**: Node.js, Express.js, Mongoose, JWT, bcryptjs, Helmet, Cors, Express Rate Limit, Express Validator, Nodemailer
- **Database**: MongoDB (Local or MongoDB Atlas)
- **DevOps & Tooling**: GitHub Actions CI, Concurrently

---

## Key Features

- **Dynamic Single-Page Navigation**: Sticky navbar with active section scrollspy and mobile drawer menu.
- **Dark/Light Mode**: Persisted theme toggle saved in `localStorage`.
- **Hero & Animated Typist**: Interactive intro banner with typing effect and "Download Resume" button.
- **Projects Showcase**: Loaded live from the Express REST API with category filtering, search input, and fallback local dataset.
- **Interactive Contact Form**: Client-side validation, server-side rate-limiting, MongoDB storage, and Nodemailer email alerts.
- **Admin Dashboard (`/admin`)**: Protected route requiring JWT authentication to add, edit, or delete projects and manage contact submissions.
- **Responsive & Accessible**: Optimized for mobile, tablet, and desktop viewports.

---

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow
├── client/                      # React Frontend (Vite + Tailwind CSS)
│   ├── public/
│   │   ├── Ankit_Resume.pdf     # Served downloadable resume
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/          # Reusable UI & section components
│   │   ├── context/             # Theme & Auth React Contexts
│   │   ├── data/
│   │   │   ├── config.js        # Single config file for social links & candidate info
│   │   │   └── fallbackProjects.js
│   │   ├── hooks/               # Custom hooks (useScrollSpy)
│   │   ├── pages/               # HomePage, AdminLoginPage, AdminDashboard, NotFoundPage
│   │   ├── services/            # Axios API client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                      # Node.js + Express REST API
│   ├── config/                  # MongoDB database connection
│   ├── controllers/             # Auth, Projects, & Contact controllers
│   ├── middleware/              # Auth, Rate Limiter, & Error Handler
│   ├── models/                  # User, Project, & ContactMessage Mongoose Schemas
│   ├── routes/                  # Express Router modules
│   ├── utils/                   # Nodemailer email sender helper
│   ├── package.json
│   ├── seed.js                  # Database seed script
│   └── server.js                # Express app entrypoint
├── .env.example                 # Root environment variable template
├── .gitignore
├── package.json                 # Root script runner (concurrently)
└── README.md
```

---

## Environment Variables

Copy `.env.example` to `.env` in the root:

```env
# Server
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ankit_portfolio
JWT_SECRET=super_secret_jwt_key_ankit_2026_change_in_production
JWT_EXPIRE=7d

# Admin Credentials
ADMIN_EMAIL=ankitkumar952390@gmail.com
ADMIN_PASSWORD=Admin@Ankit2026#Secure

# Nodemailer / Email Notifications (Optional for local test)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ankitkumar952390@gmail.com
SMTP_PASS=your_gmail_app_password
NOTIFICATION_EMAIL=ankitkumar952390@gmail.com

# Client
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ankitkumar952390/portfolio.git
   cd portfolio
   ```

2. **Install all dependencies (root, client, and server)**:
   ```bash
   npm run install:all
   ```

---

## Database Seeding

To seed initial projects (*WorkoutAdvisor*, *Interview Coach*) and create the Admin user in MongoDB:

```bash
npm run seed
```

---

## Running Locally

To run both the React frontend and Node.js Express backend concurrently:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **Admin Login**: `http://localhost:5173/admin/login`

---

## Production Build

```bash
npm run build
npm start
```
Express serves the built React static files directly from `client/dist`.

---

## Deployment Guide

### A. MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Add a Database User and allow connection IP (`0.0.0.0/0` for cloud deployment).
3. Copy the Connection String (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/ankit_portfolio`).

### B. Deploy Backend (Render / Railway / EC2)
- **Render / Railway**:
  - Connect your GitHub repo.
  - Set Build Command: `cd server && npm install`
  - Set Start Command: `node server/server.js`
  - Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, etc.).

### C. Deploy Frontend (Vercel / Netlify)
- Connect repo to Vercel/Netlify.
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Set `VITE_API_URL` to your backend URL (e.g., `https://your-backend.onrender.com/api`).

---

## API Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Public | System health check & uptime |
| **GET** | `/api/projects` | Public | Fetch list of projects |
| **POST** | `/api/projects` | Admin (JWT) | Create a new project |
| **PUT** | `/api/projects/:id` | Admin (JWT) | Update existing project |
| **DELETE**| `/api/projects/:id` | Admin (JWT) | Delete project |
| **POST** | `/api/contact` | Public (Rate Limited) | Submit contact form message |
| **GET** | `/api/contact` | Admin (JWT) | Fetch submitted contact messages |
| **DELETE**| `/api/contact/:id` | Admin (JWT) | Delete contact message |
| **POST** | `/api/auth/login` | Public | Admin login returning JWT token |
| **GET** | `/api/auth/me` | Admin (JWT) | Verify active token & user |

---

## License
MIT © Ankit Kumar
