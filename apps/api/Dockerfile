# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency-related files first for better caching
COPY package.json yarn.lock turbo.json ./
COPY apps/api/package.json ./apps/api/

# Install dependencies (cached if package files don’t change)
RUN yarn install --frozen-lockfile

# Copy the rest of the API source code
COPY apps/api ./apps/api

# Build the application
RUN yarn build

# --- Production Stage ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app/apps/api

# Copy only necessary built files from builder stage
COPY --from=builder /usr/src/app/apps/api/dist dist
COPY --from=builder /usr/src/app/apps/api/package.json package.json
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/apps/api/prisma prisma

# Set production environment
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Start API service
CMD ["node", "dist/main.js"]
