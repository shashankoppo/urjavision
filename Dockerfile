# ── Build Stage ────────────────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production Stage ───────────────────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app

# Only install production dependencies — pure JS, no native modules needed
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server and built frontend
COPY server.js ./
COPY --from=build /app/dist ./dist

# Persistent data directory
RUN mkdir -p /app/data

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/app/data

CMD ["node", "server.js"]
