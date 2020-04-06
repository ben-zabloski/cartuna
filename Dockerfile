FROM node:12

WORKDIR /usr/src/app
RUN mkdir client && mkdir server

WORKDIR /usr/src/app/client
COPY ./client/package*.json ./
RUN npm install
COPY ./client/src ./src/
COPY ./client/public ./public/
RUN npm run build

WORKDIR /usr/src/app/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/source ./source/
CMD ["node", "source/index.js"]
