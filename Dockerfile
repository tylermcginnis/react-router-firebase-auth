FROM node:8-alpine as builder

WORKDIR /code/

EXPOSE 3000

COPY . .

RUN npm install

ENTRYPOINT npm run start
