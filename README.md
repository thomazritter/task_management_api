# Task Management API

Hey there! 👋 Welcome to the Task Management API project. This is a collaborative backend API for managing users and tasks, built with Node.js, Express, Sequelize, and PostgreSQL. It also has Sentry integration for error tracking and Swagger for API docs.

---

## Features
- User management (create, read, update, delete)
- Task management (create, read, update, delete, assign to users)
- Authentication JWT (login/logout)
- Health check and error test endpoints
- Sentry error tracking (use `sentry.captureException` anywhere)
- Swagger UI for API documentation
- Dockerized for easy setup
- Jest + Supertest for testing

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the repo
```sh
git clone <your-repo-url>
cd task_management_api
```

### 2. Environment Variables
Create a `.env` file in the root with your DB and Sentry config:
```
SERVER_PORT=3001
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=ds
JWT_SECRET=mysecretkey
```

### 3. Start Everything (API + DB)
```sh
npm start
```
This will build and run everything using Docker Compose. The API will be available at `http://localhost:3001`.

### 4. API Docs (Swagger)
Visit [http://localhost:3001/api-docs](http://localhost:3001/api-docs) for interactive API documentation.

### 5. Run Tests
```sh
npm test
```

---

## API Endpoints

### Health Check
- `GET /api/health` – Check if the API is running

### Users
- `POST /api/users` – Create user
- `GET /api/users/:id` – Get user by ID
- `PUT /api/users/:id` – Update user
- `DELETE /api/users/:id` – Delete user

### Tasks
- `POST /api/tasks` – Create task
- `GET /api/tasks/:id` – Get task by ID
- `GET /api/tasks?assignedTo=<userId>` – Get tasks by user
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

### Auth
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout

### Error Testing
- `GET /api/error` – Triggers a Sentry error (for testing)

---

## Sentry Error Tracking
- Sentry is initialized in `src/sentry.js`.
- You can import and use it anywhere:
  ```js
  import Sentry from './sentry.js';
  Sentry.captureException(new Error('Something went wrong!'));
  ```
- All unhandled errors are automatically reported to my personal Sentry account - which is now on trial mode. Unfortunately, you won't be able to see how it looks, but here is a sneak peak:
  <img width="1508" alt="image" src="https://github.com/user-attachments/assets/540db9e7-daa2-4160-845c-778f58525200" />


---

## Testing
- Tests are in `src/tests/app.test.js` using Jest and Supertest.
- Run with `npm test`.

---

## Docker
- The project is fully dockerized. See `docker-compose.yaml` and `Dockerfile`.
- Database data is persisted in a Docker volume.
