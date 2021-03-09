#### Stage 1: Build the Application
FROM node:14-alpine as builder

# Set the current working directory inside the image
WORKDIR /usr/app

ARG NODE_ENV

# First copy package.json and package-lock.json to optimize cache hits
COPY package*.json ./

# Install dependencies.
RUN npm install

# After installing dependencies, copy everything
COPY ./ ./

# Compile
RUN npm run build

#### Stage 2: Run the Application in slim container
FROM node:14-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app/build ./build

EXPOSE ${PORT}

CMD ["npm", "start"]
