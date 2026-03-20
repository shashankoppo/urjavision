# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install build dependencies for native modules (like sqlite3)
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Need build dependencies again for production install if not using bundles
RUN apk add --no-cache python3 make g++

# Copy package files and install production deps only
COPY package*.json ./
RUN npm install --omit=dev

# We can remove build tools after install to keep image small
RUN apk del python3 make g++

# Copy server code and built frontend
COPY server.js ./
COPY --from=build /app/dist ./dist

# Create a data directory for the DB and ensure it is writable
RUN mkdir -p /app/data && chmod 777 /app/data

# EXPOSE 3000
EXPOSE 3000

# Set environment variable for the database path
ENV DB_PATH=/app/data/urja.db

CMD ["node", "server.js"]

