# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Default to production
ENV NODE_ENV=production

# Run migration and seed automatically when container starts
CMD npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start
