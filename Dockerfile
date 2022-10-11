FROM node:16.13

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT npm run start2