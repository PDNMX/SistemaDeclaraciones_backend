FROM node:14-alpine

ADD . /backend
WORKDIR /backend

ARG NODE_ENV

RUN yarn add global yarn \
&& yarn install \
&& yarn build \
&& yarn cache clean

CMD ["yarn", "start"]
