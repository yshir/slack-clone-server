FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i && npm i -g nodemon

COPY . .

ENV PORT 3001

EXPOSE 3001
