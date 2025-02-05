# To launch from root directory

# Use the official Node.js 20 image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package files
COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/

# Install all dependencies (including devDependencies).
RUN yarn install

# Copy the rest of the application code to the container.
COPY apps/api ./apps/api

# Set working directory to the api app
WORKDIR /usr/src/app/apps/api

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 8000

# Run the web service on container startup.
CMD [ "node", "dist/main.js" ]