# Use the official Node.js 20 image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies).
RUN yarn install

# Copy the rest of the application code to the container.
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN yarn build

# Run the web service on container startup.
CMD [ "node", "dist/main.js" ]