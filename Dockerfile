# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with clean install
RUN npm ci

# Copy source files
COPY . .

# Build the Next.js static export
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80 for Railway
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
