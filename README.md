# Nesty

Nesty is a Node.js application built with the NestJS framework, designed for building efficient and scalable server-side applications.

## Getting Started

Follow these instructions to set up and run the Nesty application on your local machine.

### Prerequisites

- Node.js 20 or later
- Yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nicolasvienot/nesty.git
   cd nesty
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

### Running the Application

To start the application in development mode, run:

```bash
yarn start:dev
```

The application will be running at `http://localhost:3000`.

### Running Tests

To execute the test suite, run:

```bash
yarn test
```

### Building the Application

To build the application for production, run:

```bash
yarn build
```

### Deployment

For deployment, you can use Docker. Ensure Docker is installed and running on your machine.

1. Build the Docker image:

   ```bash
   docker build -t nesty .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 nesty
   ```

### API Endpoints

#### Authentication

- **POST /login**: Authenticate a user and receive a JWT token.
- **POST /register**: Register a new user and receive a JWT token.

#### Users

- **POST /users**: Create a new user.
- **GET /users**: Retrieve all users (requires authentication).
- **GET /users/:id**: Retrieve a specific user by ID (requires authentication).
- **PUT /users/:id**: Update a user's information (requires authentication).
- **DELETE /users/:id**: Delete a user (requires authentication).

#### Projects

- **POST /projects**: Create a new project (requires authentication).
- **GET /projects**: Retrieve all projects for the authenticated user.
- **GET /projects/:id**: Retrieve a specific project by ID (requires authentication).
- **PUT /projects/:id**: Update a project's information (requires authentication).
- **DELETE /projects/:id**: Delete a project (requires authentication).

### License

This project is licensed under the MIT License.
