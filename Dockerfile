# ── Build Stage ────────────────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./

# Install ALL deps (dev + prod) needed to build the frontend
RUN npm install

# Copy all source files and build
COPY . .
RUN npm run build

# ── Production Stage ───────────────────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies (express, cors — pure JS, no native modules)
RUN npm install --omit=dev

# Copy compiled server from source
COPY server.js ./

# Copy built React frontend from build stage
COPY --from=build /app/dist ./dist

# Create persistent data directory
RUN mkdir -p /app/data && chmod 777 /app/data

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/app/data

CMD ["node", "server.js"]
