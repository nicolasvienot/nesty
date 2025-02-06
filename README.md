# Nesty

Nesty is a monorepo project containing a NestJS API and Next.js frontend, built using Turborepo.

## Project Structure

The project is organized into the following directories:

```
nesty/
├── apps/
│ ├── api/ # NestJS backend
│ └── web/ # Next.js frontend
└── package.json
```

## Prerequisites

- Node.js 20 or later
- Yarn package manager
- MongoDB (for the API)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nicolasvienot/nesty.git
   cd nesty
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Development

To run both applications in development mode:

```bash
yarn dev
```

Or run each application separately:

```bash
cd apps/api
yarn dev
```

```bash
cd apps/web
yarn dev
```

The applications will be running at:

- API: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## Building

Build all applications:

```bash
yarn build
```

Build a specific application:

```bash
cd apps/api
yarn build
```

```bash
cd apps/web
```

## Docker Deployment

1. Build and run using docker-compose:

   ```bash
   docker-compose up --build
   ```

   This will start:

   - API on port 8000
   - Frontend on port 3000
   - Caddy reverse proxy on ports 80/443

2. Environment variables needed:
   - `DATABASE_URL`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication
   - `FRONTEND_URL`: URL of the Next.js frontend

## API Endpoints

### Authentication

- **POST /auth/login**: Authenticate a user and receive a JWT token
- **POST /auth/register**: Register a new user and receive a JWT token
- **GET /auth/session**: Get the current authenticated user's session from JWT token

### Users

- **POST /users**: Create a new user
- **GET /users**: Retrieve all users (requires authentication)
- **GET /users/:id**: Retrieve a specific user by ID (requires authentication)
- **PUT /users/:id**: Update a user's information (requires authentication)
- **DELETE /users/:id**: Delete a user (requires authentication)

### Projects

- **POST /projects**: Create a new project (requires authentication)
- **GET /projects**: Retrieve all projects for the authenticated user
- **GET /projects/:id**: Retrieve a specific project by ID (requires authentication)
- **PUT /projects/:id**: Update a project's information (requires authentication)
- **DELETE /projects/:id**: Delete a project (requires authentication)

## License

This project is licensed under the MIT License.
