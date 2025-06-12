# FROM node:24-alpine3.18
FROM debian:12

LABEL org.opencontainers.image.source=https://github.com/lyazide/cesizen

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_24.x | bash \
    && apt-get install nodejs -yq \
    && apt-get clean -y

ADD . /app/

WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm run start