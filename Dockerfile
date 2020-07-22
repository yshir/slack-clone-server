FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g nodemon sequelize-cli && npm i

COPY . .

ENV PORT 3001

EXPOSE 3001
