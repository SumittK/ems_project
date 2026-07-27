# EMS Project API

A RESTful Authentication API built with **Node.js**, **Express.js**, and **MongoDB**. It provides user authentication features such as registration, login, JWT-based authentication, email verification, and password reset.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Email Verification
- Forgot Password
- Reset Password
- MongoDB Integration (Mongoose)
- Environment Variable Configuration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Nodemailer
- dotenv

---

## 📂 Project Structure

```
auth_project/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/SumittK/ems_project.git
```

Navigate to the project

```bash
cd ems_project
```

Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000

JWT_SECRET=your_jwt_secret

MONGO_URI=your_mongodb_connection_string

EMAIL=your_email@gmail.com

PASSWORD=your_gmail_app_password
```

---

## ▶️ Run the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## 📌 API Base URL

Local

```
http://localhost:3000
```

Production

```
https://your-render-url.onrender.com
```

---

## 📖 Authentication APIs

### Register

```
POST /api/auth/register
```

Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

---

### Login

```
POST /api/auth/login
```

Request

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

---

### Forgot Password

```
POST /api/auth/forgot-password
```

Request

```json
{
  "email": "john@example.com"
}
```

---

### Reset Password

```
POST /api/auth/reset-password
```

Request

```json
{
  "token": "reset_token",
  "password": "NewPassword@123"
}
```

---

## 🔐 Authentication

Protected APIs require a JWT token.

Example Header

```
Authorization: Bearer <your_jwt_token>
```

---

## 🌐 Deployment

The API can be deployed on:

- Render
- Railway
- Koyeb

---

## 📜 Available Scripts

```bash
npm start
```

Starts the production server.

```bash
npm run dev
```

Starts the server with Nodemon.

---

## 📄 Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- cookie-parser
- nodemailer

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## 👨‍💻 Author

**Sumit Kumar**

GitHub: https://github.com/SumittK

---

## 📃 License

This project is licensed under the MIT License.
