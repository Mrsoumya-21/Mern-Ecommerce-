# ShopEase - MERN E-Commerce Platform

ShopEase is a modern, full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features robust authentication with OTP verification, an admin dashboard, product management, a shopping cart, order management, and a clean, responsive UI.

---

## Features

- **User Authentication:** Register, login, OTP verification (with resend OTP), JWT-based sessions.
- **Admin Panel:** Manage products and orders.
- **Product Catalog:** Browse, search, and filter products.
- **Shopping Cart:** Add, update, and remove items.
- **Order Management:** Place orders, view order history.
- **Review System:** Leave reviews for purchased products.
- **Responsive UI:** Modern design using Tailwind CSS.
- **Security:** Environment variables, secure cookies, authentication middleware.
- **Extensible:** Modular codebase for easy feature addition.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, React Router
- **Backend:** Node.js, Express, Mongoose, JWT, Nodemailer
- **Database:** MongoDB (Atlas recommended)
- **Other:** PM2 (for process management), dotenv

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/YOUR-USERNAME/ShopEase.git
cd ShopEase
```

### 2. Setup the Backend

```sh
cd server
cp .env.example .env
# Edit .env and set your MongoDB URI and other secrets
npm install
npm start
```

### 3. Setup the Frontend

```sh
cd ../client
npm install
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173)
- The backend will run on [http://localhost:5000](http://localhost:5000)

---

## Environment Variables

Create a `.env` file in the `server` directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
CLIENT_SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

---

## Folder Structure

```
mern-ecommerce-2024-master/
│
├── client/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   └── ...
│
├── server/         # Node.js backend
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## Key Scripts

### Frontend

- `npm run dev` – Start development server
- `npm run build` – Build for production

### Backend

- `npm start` – Start backend server

---

## Deployment

- **Frontend:** Build with `npm run build` and serve `dist/` with Nginx, Apache, or [serve](https://www.npmjs.com/package/serve).
- **Backend:** Deploy on AWS EC2, Heroku, or any Node.js hosting. Use [PM2](https://pm2.keymetrics.io/) for process management.
- **Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for production.

---

## Customization

- **Branding:** Change logo and name in `client/src/assets` and relevant components.
- **Favicon & Tab Title:** Update `client/public/index.html`.
- **Environment Variables:** Never commit `.env` to version control.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [PM2](https://pm2.keymetrics.io/)

---

**Happy Coding!**
