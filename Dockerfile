FROM node:lts

RUN mkdir /app
WORKDIR /app

COPY ./familylistapp  /app

RUN npm install
RUN npm update
RUN npm run build
EXPOSE 3000

CMD ["npm","run","start"]
