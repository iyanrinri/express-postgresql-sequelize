# Express JWT + PostgreSQL + Docker Example

This project is an Express.js REST API with JWT authentication, PostgreSQL database, Sequelize ORM, and Swagger documentation. It is fully containerized with Docker Compose and supports automatic migration and seeding.

## Features
- JWT authentication
- Employee CRUD API (with controller)
- PostgreSQL database (via Docker)
- Sequelize ORM, migration, and seeder
- Swagger UI documentation (`/api-docs`)
- Auto-migrate and auto-seed on container start

## Getting Started

### 1. Clone & Setup
```sh
git clone <repo-url>
cd express-jwt
```

### 2. Environment Variables
Edit `.env` (already provided):
```
DB_NAME=expressjwt
DB_USER=expressuser
DB_PASS=expresspass
DB_HOST=db
SECRET_KEY=supersecretkey123
DEBUG=express-jwt:*
NODE_ENV=development
DATABASE_URL=postgres://expressuser:expresspass@db:5432/expressjwt
```

### 3. Build & Run with Docker Compose
```sh
docker-compose up --build
```
- This will build the app and database containers, run migrations, and seed 100 random employees automatically.

### 4. API Endpoints
- `GET    /employees` — List all employees
- `GET    /employees/:id` — Get employee by ID
- `POST   /employees` — Create new employee
- `PUT    /employees/:id` — Update employee
- `DELETE /employees/:id` — Delete employee

### 5. Swagger API Docs
- Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive API documentation.

### 6. Manual Migration/Seeding (if needed)
```sh
docker-compose exec app npx sequelize-cli db:migrate
# or
docker-compose exec app npx sequelize-cli db:seed:all
```

## Project Structure
- `models/` — Sequelize models
- `controllers/` — Route controllers
- `routes/` — Express routes (with Swagger docs)
- `migrations/` — Sequelize migrations
- `seeders/` — Sequelize seeders
- `swagger.js` — Swagger config
- `docker-compose.yml` — Multi-container setup
- `Dockerfile` — App container build

## Notes
- All database data is persisted in the `pgdata` Docker volume.
- Change `.env` to update database/user/password as needed.
- App auto-migrates and seeds on every container start.

---

Feel free to modify or extend the API as needed!
