# Task-Management FullStack webapp ✍

Multiuser **Task Management** web app prioritizing robust security measures. By leveraging JWT, I ensure secure user access through an auto-renewed token stored in local storage, expiring after 15 mins. To enhance protection, a 7-day HTTP-only cookie handles refresh tokens, guiding users to log in for an added layer of security. 💻🔐

### For api documentation follow this link: 👉 [API Documentation](https://documenter.getpostman.com/view/23451188/2s9YeG7XnC)

### Project Demo: 👉 [Task Management WebApp (YouTUbe)](https://youtu.be/3AevM0zyfrk)

## Libraries used:

### 1. Frontend:

1.  axios
2.  react-icons
3.  react-toastify
4.  tailwind css

**Redux**, **React Query** isn't used in this project due to the simplicity of project.

### 2. Backend:

1.  express
2.  jsonwebtoken
3.  mysql2
4.  sequelize
5.  bcrypt

## Installation guide

1. First of all clone the project
   ```bash
   git clone https://github.com/itsankitbhusal/task-management
   ```
2. Go to the project directory

   ```bash
   cd task-management
   ```

3. Install the dependencies for backend
   ```bash
   pnpm install
   ```
4. Add the environment variables like
   1. database name, user, password, host, dialect (use mysql for both mariadb and mysql)
   2. port(backend api port),
   3. for jwt access and refresh you can place anything
   4. frontend url(url with port where frontend is running)
5. Install the dependencies for frontend
   ```bash
   cd frontend && pnpm install
   ```
6. Edit the **BASE_URL** if needed in `/src/constants/index.js`

## Running the project

1. Backend server start
   ```bash
   pnpm start
   ```
2. Frontend server start

   ```bash
   cd ./frontend && pnpm run dev
   ```

## Thank you 😊
