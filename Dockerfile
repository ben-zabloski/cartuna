FROM node:12

ARG REACT_APP_DATABASE_URL=https://cartuna-database.herokuapp.com/v1/graphql/
ARG REACT_APP_THE_TV_DB_BASE_URL=https://www.thetvdb.com
ARG REACT_APP_THE_TV_DB_BANNER_URL=http://thetvdb.com/banners

WORKDIR /usr/src/app
RUN mkdir client && mkdir server

WORKDIR /usr/src/app/client
COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
RUN npm install
COPY ./client/src ./src/
COPY ./client/public ./public/
RUN npm run build

WORKDIR /usr/src/app/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/source ./source/
CMD ["node", "source/index.js"]
