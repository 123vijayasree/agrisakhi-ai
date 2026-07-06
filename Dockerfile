# Step 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Runtime stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
# Copy built files
COPY --from=builder /app/dist ./dist
# Install sirv-cli to serve the build output
RUN npm install -g sirv-cli

# Default Cloud Run port
EXPOSE 8080

# Serve static files, redirecting 404s to index.html (useful for React Router/SPAs)
CMD ["sh", "-c", "sirv dist --port $PORT --host 0.0.0.0 --single"]
