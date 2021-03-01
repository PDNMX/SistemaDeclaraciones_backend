#### Stage 1: Build the Application

FROM node:15

# Update packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y make gcc build-essential

# Set the current working directory inside the image
WORKDIR /usr/app

ARG NODE_ENV

# First copy package.json and package-lock.json to optimize cache hits
COPY package*.json ./


#### Stage 2: Install dependencies.
RUN npm install

# After installing dependencies, copy everything
COPY ./ ./

EXPOSE 3000
