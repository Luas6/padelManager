# Use the official Node.js image as a base image for building the frontend
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project source code
COPY . .

# Build the frontend application with development configuration
RUN npm run build --configuration=production

# Use the official Nginx image as a base image for serving the frontend
FROM nginx:alpine

# Copy the built files from the previous stage to NGINX's web root directory
COPY --from=build /app/dist/padel-manager-frontend /usr/share/nginx/html

# Expose the port on which NGINX will run
EXPOSE 80
