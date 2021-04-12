FROM node:14-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /backend
WORKDIR /backend

ARG NODE_ENV

RUN npm install \
&& npm build \
&& npm cache clean --force

EXPOSE ${PORT}

CMD ["npm", "start"]
