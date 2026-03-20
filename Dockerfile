# Build stage
FROM node:18-slim AS build

WORKDIR /app

# Install build dependencies for native modules (Debian version)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Install runtime dependencies if needed (Debian version)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files and install production deps only
COPY package*.json ./
RUN npm install --omit=dev && apt-get purge -y python3 make g++ && apt-get autoremove -y

# Copy server code and built frontend
COPY server.js ./
COPY --from=build /app/dist ./dist

# Create a data directory for the DB and ensure it is writable
RUN mkdir -p /app/data && chmod 777 /app/data

# EXPOSE 3000
EXPOSE 3000

# Set environment variable for the database path
ENV DB_PATH=/app/data/urja.db
ENV NODE_ENV=production

CMD ["node", "server.js"]


