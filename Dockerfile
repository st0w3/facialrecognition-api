# syntax=docker/dockerfile:1

FROM node:18
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
EXPOSE 80
CMD [ "node", "server.js" ]