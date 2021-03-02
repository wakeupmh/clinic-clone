FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install --save-dev sequelize-cli
RUN npx sequelize-cli db:migrate

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm" ]

CMD ["run", "start:api"]
