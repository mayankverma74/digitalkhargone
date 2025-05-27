  # Use official Node.js runtime as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose Cloud Run's default port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
 