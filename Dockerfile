# syntax=docker/dockerfile:1

FROM node:18
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
EXPOSE 443
CMD [ "node", "server.js" ]