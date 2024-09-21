FROM node:22 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Build the Vite app for production
RUN yarn build

FROM nginx:alpine

# Copy the built app files to the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
