FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENTRYPOINT [ "npm" ]

CMD ["run", "start:api"]