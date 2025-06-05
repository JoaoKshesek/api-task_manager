# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npx knex migrate:latest

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]
