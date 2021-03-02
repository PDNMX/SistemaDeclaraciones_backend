#### Stage 1: Build the Application
FROM node:15 as builder

# Update packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y make gcc build-essential

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
FROM node:15-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/app/build ./build

EXPOSE 3000

CMD npm start
