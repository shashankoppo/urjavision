# ── Build Stage ────────────────────────────────────────────────────────────────
FROM node:18-bookworm-slim AS build

WORKDIR /app

# Install build dependencies for native modules (better-sqlite3 needs these)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install ALL dependencies (including dev) so we can build the frontend
COPY package*.json ./
RUN npm ci

# Copy source and build the React frontend
COPY . .
RUN npm run build

# ── Production Stage ───────────────────────────────────────────────────────────
FROM node:18-bookworm-slim

WORKDIR /app

# Install build tools needed to compile better-sqlite3 native bindings
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files and install production dependencies only
# better-sqlite3 needs --build-from-source to compile against the local glibc
COPY package*.json ./
RUN npm ci --omit=dev --build-from-source

# Copy the compiled server
COPY server.js ./

# Copy the built React frontend from the build stage
COPY --from=build /app/dist ./dist

# Create persistent data directory for SQLite
RUN mkdir -p /app/data && chmod 777 /app/data

EXPOSE 3000

ENV DB_PATH=/app/data/urja.db
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]
