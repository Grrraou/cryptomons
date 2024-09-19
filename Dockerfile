# Use Node.js 20-alpine as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port on which the dev server will run (commonly 3000 or 8080)
EXPOSE 3000

# Start the dev server (you can customize the port if needed)
CMD ["yarn", "build"]
