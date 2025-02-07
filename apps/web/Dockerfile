# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy TurboRepo config and package files to leverage Docker caching
COPY package.json yarn.lock turbo.json ./
COPY apps/web/package.json ./apps/web/

# Install dependencies (cached if package files don't change)
RUN yarn install --frozen-lockfile

# Copy only the web application source
COPY apps/web ./apps/web

# Set build-time environment variable
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build Next.js
RUN yarn build

# --- Production Stage ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app/apps/web

# Copy only the necessary built files from the builder stage
COPY --from=builder /usr/src/app/apps/web/.next .next
COPY --from=builder /usr/src/app/apps/web/public public
COPY --from=builder /usr/src/app/apps/web/package.json package.json
COPY --from=builder /usr/src/app/node_modules node_modules

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["yarn", "start"]
