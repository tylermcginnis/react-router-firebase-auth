FROM node:8-alpine as builder

WORKDIR /code/

EXPOSE 3000

COPY . .

RUN npm install --unsafe-perm

RUN npm run build


FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /code/build .
