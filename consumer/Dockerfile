FROM node:12.14.1-alpine3.11

WORKDIR /app/consumer
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm","run","consumer" ]