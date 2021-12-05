FROM node:14-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

FROM alpine:3 as dist

EXPOSE 47808/tcp
EXPOSE 47808/udp

WORKDIR /usr/src/app
RUN apk add nodejs --no-cache
COPY --from=build /usr/src/app /usr/src/app

CMD [ "node", "src/app.js" ]