# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production deps only
COPY package*.json ./
RUN npm install --production

# Copy server code and built frontend
COPY server.js ./
COPY --from=build /app/dist ./dist

# Create an empty database if it doesn't exist (handled by server.js initialization)
# But we ensure the directory is writable
RUN touch urja.db && chmod 666 urja.db

EXPOSE 3000

CMD ["node", "server.js"]
