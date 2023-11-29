FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
CMD [ "yarn","run", "dev" ]
