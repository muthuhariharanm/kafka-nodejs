FROM node:12.14.1-alpine3.11

WORKDIR /app/producer
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm","run","producer" ]