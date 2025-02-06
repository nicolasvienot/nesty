# To launch from root directory

# Use the official Node.js 20 image as a base
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json .
COPY yarn.lock .
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY apps/web ./apps/web

# Set working directory to the web app
WORKDIR /usr/src/app/apps/web

# Set the API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
