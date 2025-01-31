FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3331

CMD ["node", "app.js"]
