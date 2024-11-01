FROM node:18-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
