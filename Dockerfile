FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./familylistapp  /app

RUN npm install
RUN npm install --only=dev #hacky

EXPOSE 3000

CMD ["npm","run","dev"]
