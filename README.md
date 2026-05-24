# 🌐 Live Server

🔗 Live API Link:

https://back-end-projects.vercel.app

---

# 🚀 DevPulse API

A collaborative backend issue tracking system where software teams can report bugs, request features, and manage issue workflows collaboratively.

---

# 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| Node.js | JavaScript Runtime |
| TypeScript | Type Safety |
| Express.js | Backend Framework |
| PostgreSQL | Relational Database |
| Raw SQL | Database Query |
| bcrypt | Password Hashing |
| JWT | Authentication |

---

# ✨ Features

## 🔐 Authentication System

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

# 👥 User Roles & Permissions

## 🧑 Contributor
Can:
- Register & Login
- Create Issues
- View All Issues
- Update Own Issue (only when status is `open`)

---

## 👨‍🔧 Maintainer
Can:
- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Workflow Status

---

# 🗄️ Database Schema

## 📌 Users Table

| Field | Description |
|---|---|
| id | Auto Increment ID |
| name | User Full Name |
| email | Unique User Email |
| password | Hashed Password |
| role | contributor / maintainer |
| created_at | Created Timestamp |
| updated_at | Updated Timestamp |

---

## 📌 Issues Table

| Field | Description |
|---|---|
| id | Auto Increment ID |
| title | Issue Title |
| description | Detailed Description |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | User ID |
| created_at | Created Timestamp |
| updated_at | Updated Timestamp |

---

# 🔑 Authentication Flow

1. User Registration
2. Password Hashing with bcrypt
3. User Login
4. JWT Token Generation
5. Token Verification Middleware
6. Protected Route Access

---

# 🔐 Authorization Header

```http
Authorization: <TOKEN>
```

---

# 📡 API Endpoints

# 🔹 Authentication Routes

---

## ✅ Register User

### Endpoint

```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@devpulse.com",
    "role": "contributor",
    "created_at": "2026-01-20T09:00:00Z",
    "updated_at": "2026-01-20T09:00:00Z"
  }
}
```

---

## ✅ Login User

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "john.doe@devpulse.com",
  "password": "securePassword123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@devpulse.com",
      "role": "contributor"
    }
  }
}
```

---

# 🔹 Issue Routes

---

## ✅ Create Issue

### Endpoint

```http
POST /api/issues
```

### Headers

```http
Authorization: <TOKEN>
```

### Request Body

```json
{
  "title": "Database connection timeout under load",
  "description": "Pool exhausts after 50+ concurrent queries",
  "type": "bug"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries",
    "type": "bug",
    "status": "open",
    "reporter_id": 1
  }
}
```

---

## ✅ Get All Issues

### Endpoint

```http
GET /api/issues
```

---

## 🔎 Query Parameters

| Parameter | Values | Default |
|---|---|---|
| sort | newest / oldest | newest |
| type | bug / feature_request | none |
| status | open / in_progress / resolved | none |

---

## ✅ Query Example

```http
GET /api/issues?sort=newest&type=bug&status=open
```

---

## ✅ Get Single Issue

### Endpoint

```http
GET /api/issues/:id
```

---

## ✅ Update Issue

### Endpoint

```http
PATCH /api/issues/:id
```

### Headers

```http
Authorization: <TOKEN>
```

### Request Body

```json
{
  "title": "Updated Issue Title",
  "description": "Updated Description",
  "type": "bug"
}
```

---

## ✅ Delete Issue

### Endpoint

```http
DELETE /api/issues/:id
```

### Headers

```http
Authorization: <TOKEN>
```

---

# 🛡️ Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Input Validation
- Global Error Handling

---

# 📁 Project Structure

```bash
src/
│
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── issues/
│   │   │   ├── issue.controller.ts
│   │   │   ├── issue.service.ts
│   │   │   ├── issue.route.ts
│   │   │   └── issue.validation.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── role.ts
│   │   └── globalErrorHandler.ts
│   │
│   ├── db/
│   │   └── index.ts
│   │
│   ├── utils/
│   │
│   └── config/
│       └── index.ts
│
├── app.ts
├── server.ts
└── package.json
```

---

# ⚙️ Environment Variables

Create a `.env` file in root directory:

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

NODE_ENV=development
```

---

# ▶️ Run Project Locally

## 📦 Install Dependencies

```bash
npm install
```

---

## 🚀 Run Development Server

```bash
npm run dev
```

---

# 📌 Important Notes

- Used Raw SQL only
- No ORM used
- No SQL JOIN used
- Reporter data fetched separately
- Password never returned in API response

---

# ✅ Success Response Structure

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

# ❌ Error Response Structure

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

# 👨‍💻 Author

## Yasir Arafat Alif

---

# 📄 License

This project is for educational and assignment purposes only.
