FROM node:15-alpine as build
RUN apk add bash
WORKDIR /src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8086 8087
CMD ["npm","start"]
