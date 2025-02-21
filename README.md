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
- Redis (for queue system)
- Docker (optional, for containerized deployment)
- Google OAuth credentials (for Google authentication)
- GitHub OAuth credentials (for GitHub authentication)

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

# To start the REPL development server:
cd apps/api
yarn dev --entryFile ./repl.js
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

## Environment Variables

### API (.env)

- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `API_URL`: URL of the NestJS API
- `FRONTEND_URL`: URL of the Next.js frontend
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_REDIRECT_URI`: Redirect URL after Google authentication
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret
- `GITHUB_REDIRECT_URI`: Redirect URL after GitHub authentication
- `REDIS_HOST`: Redis host (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password for authentication
- `SENDGRID_API_KEY`: API key for SendGrid
- `SENDGRID_FROM_EMAIL`: Default sender email address for SendGrid

### Frontend (.env)

- `NEXT_PUBLIC_API_URL`: URL of the NestJS API

## Docker Deployment

There are two ways to deploy the application using Docker:

### 1. Using Pre-built Images

The easiest way is to use the pre-built images from Docker Hub:

```bash
# Pull and run using docker-compose
git clone https://github.com/nicolasvienot/nesty.git
cd nesty
docker-compose up -d
```

This will:

- Pull images: `nicolasvienot/nesty-api:latest` and `nicolasvienot/nesty-web:latest`
- Set up Caddy as reverse proxy
- Configure all services with proper environment variables

### 2. Building Images Locally

Alternatively, you can build the images yourself:

```bash
# Build and run API
cd apps/api
docker build -t nesty-api .
docker run -p 8000:8000 \
  --env-file .env \
  nesty-api

# Build and run Frontend
cd apps/web
docker build -t nesty-web \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000 .
docker run -p 3000:3000 nesty-web
```

### Environment Setup

When using docker-compose, create a `.env` file in the root directory with:

```env
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=your_github_redirect_uri
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_sendgrid_from_email
```

### Production Deployment

The project includes GitHub Actions workflow that automatically:

1. Builds new Docker images
2. Pushes them to Docker Hub
3. Deploys to EC2 using docker-compose
4. Sets up Caddy for HTTPS and reverse proxy

## API Endpoints

### Authentication

- **POST /auth/login**: Authenticate a user and receive a JWT token in HTTP-only cookie
- **POST /auth/register**: Register a new user and receive a JWT token in HTTP-only cookie
- **POST /auth/logout**: Clear authentication cookie
- **GET /auth/session**: Get the current authenticated user's session
- **GET /auth/google**: Initiate Google OAuth authentication
- **GET /auth/google/callback**: Handle Google OAuth callback
- **GET /auth/github**: Initiate GitHub OAuth authentication
- **GET /auth/github/callback**: Handle GitHub OAuth callback

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

## Scheduler System

The API implements a scheduling system using `@nestjs/schedule` for handling timed tasks. The scheduler system:

- Executes cron jobs at specified intervals
- Handles daily, hourly, and custom scheduled tasks
- Provides built-in error handling and logging
- Supports various cron patterns using CronExpression

### Scheduler Configuration

The scheduler system is automatically configured when running the API. It supports:

- Cron jobs (time-based scheduled tasks)
- Intervals (recurring tasks)
- Timeouts (delayed tasks)

Example cron patterns:

```typescript
// Daily at midnight
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)

// Every hour
@Cron(CronExpression.EVERY_HOUR)

// Custom pattern (every 5 minutes)
@Cron('*/5 * * * *')
```

## Queue System

The API implements a job queue system using Bull and Redis for handling asynchronous tasks. The queue system:

- Processes background jobs reliably
- Handles automatic retries with exponential backoff
- Provides job status monitoring
- Ensures data persistence through Redis

### Queue Configuration

The queue system is automatically configured when running the API, either directly or through Docker. It requires:

- Redis server running
- Proper Redis credentials in environment variables
- Queue module configured in the API

### Jobs

The following jobs are processed by the queue system:

- **process-user-created**: Triggered when a new user is created. Sends a welcome email to the user using the `MailerService`.

## License

This project is licensed under the MIT License.
