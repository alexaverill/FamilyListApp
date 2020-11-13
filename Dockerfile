FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./familylistapp  /app

RUN npm install
RUN npm update

EXPOSE 3000

CMD ["npm","run","dev"]
