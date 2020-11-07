FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./familylistapp  /app

RUN npm install
RUN npm update
RUN npx sequelize-cli db:migrate 
RUN npx sequelize-cli db:seed:all 
EXPOSE 3000

CMD ["npm","run","dev"]
